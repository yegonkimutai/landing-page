import { Request, Response } from "express";
import { pool } from "../db/database.js";
import { contactSchema } from "../validators/contact.validator.js";

export async function createContact(
  req: Request,
  res: Response
) {
  try {
    // Validate request body
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please correct the errors in your submission.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, subject, message } = result.data;

    // Store inquiry
    const query = `
      INSERT INTO inquiries (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, subject, message, created_at
    `;

    const values = [
      name,
      email,
      subject,
      message,
    ];

    const { rows } = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      inquiry: rows[0],
    });
  } catch (error) {
    console.error("Contact submission error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while submitting your inquiry. Please try again later.",
    });
  }
}
