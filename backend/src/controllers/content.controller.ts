import { Request, Response } from "express";
import { pool } from "../db/database.js";
import { contentSchema } from "../validators/content.validator.js";

//GET CONTENT
export async function getContent(
  _req: Request,
  res: Response
) {
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM content_items
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      content: rows,
    });
  } catch (error) {
    console.error("Get content error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve content.",
    });
  }
}

//CREATE CONTENT
export async function createContent(
  req: Request,
  res: Response
) {
  try {
    const result = contentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please correct the errors.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      title,
      description,
      content_type,
      status,
    } = result.data;

    const query = `
      INSERT INTO content_items
        (title, description, content_type, status)
      VALUES
        ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [
      title,
      description,
      content_type,
      status,
    ];

    const { rows } = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Content created successfully.",
      content: rows[0],
    });
  } catch (error) {
    console.error("Create content error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create content.",
    });
  }
}

//UPDATE CONTENT
export async function updateContent(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content ID.",
      });
    }

    const result = contentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please correct the errors.",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const {
      title,
      description,
      content_type,
      status,
    } = result.data;

    const query = `
      UPDATE content_items
      SET
        title = $1,
        description = $2,
        content_type = $3,
        status = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;

    const values = [
      title,
      description,
      content_type,
      status,
      id,
    ];

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Content updated successfully.",
      content: rows[0],
    });
  } catch (error) {
    console.error("Update content error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update content.",
    });
  }
}

//DELETE CONTENT
export async function deleteContent(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content ID.",
      });
    }

    const { rows } = await pool.query(
      `
        DELETE FROM content_items
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Content deleted successfully.",
    });
  } catch (error) {
    console.error("Delete content error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete content.",
    });
  }
}
