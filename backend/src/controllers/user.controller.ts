import { Request, Response } from "express";
import { pool } from "../db/database.js";
import { updateUserSchema } from "../validators/user.validator.js";

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

/**
 * GET /api/users/me
 */
export async function getCurrentUser(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { rows } = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        created_at,
        updated_at
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: rows[0],
    });
  } catch (error) {
    console.error(
      "Get current user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to retrieve your account information.",
    });
  }
}

/**
 * PUT /api/users/me
 */
export async function updateCurrentUser(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const result =
      updateUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message:
          "Please correct the validation errors.",
        errors:
          result.error.flatten().fieldErrors,
      });
    }

    const {
      name,
      email,
    } = result.data;

    const normalizedEmail =
      email.toLowerCase();

    /*
     * Check whether another account
     * already uses this email.
     */
    const existingUser =
      await pool.query(
        `
        SELECT id
        FROM users
        WHERE email = $1
        AND id != $2
        `,
        [
          normalizedEmail,
          req.user.id,
        ]
      );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Another account is already using this email.",
      });
    }

    const { rows } = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        email = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING
        id,
        name,
        email,
        created_at,
        updated_at
      `,
      [
        name,
        normalizedEmail,
        req.user.id,
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Account information updated successfully.",
      user: rows[0],
    });
  } catch (error) {
    console.error(
      "Update current user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update your account information.",
    });
  }
}
