import { Router } from "express";
import { getCurrentUser, updateCurrentUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

/*
 * Every route in this file requires
 * authentication.
 */

router.get(
  "/me",
  authenticate,
  getCurrentUser
);

router.put(
  "/me",
  authenticate,
  updateCurrentUser
);

export default router;
