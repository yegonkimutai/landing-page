import { Router } from "express";

import {
  getContent,
  createContent,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getContent);

router.post("/", authenticate, createContent);

router.put("/:id", authenticate, updateContent);

router.delete("/:id", authenticate, deleteContent);

export default router;
