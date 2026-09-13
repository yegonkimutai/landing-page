import { Router } from "express";

import {
  getContent,
  createContent,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";

const router = Router();

router.get("/", getContent);

router.post("/", createContent);

router.put("/:id", updateContent);

router.delete("/:id", deleteContent);

export default router;
