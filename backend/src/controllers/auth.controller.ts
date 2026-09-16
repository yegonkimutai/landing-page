import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { pool } from "../db/database.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";
import { generateToken } from "../utils/auth.js";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please correct the validation errors.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      name,
      email,
      password,
    } = result.data;

    const normalizedEmail = email.toLowerCase();

    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      `,
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    const { rows } = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password_hash
      )
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
      `,
      [
        name,
        normalizedEmail,
        passwordHash,
      ]
    );

    const user = rows[0];

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account.",
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid login details.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      email,
      password,
    } = result.data;

    const normalizedEmail = email.toLowerCase();

    const { rows } = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        created_at
      FROM users
      WHERE email = $1
      `,
      [normalizedEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = rows[0];

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to log in.",
    });
  }
}
