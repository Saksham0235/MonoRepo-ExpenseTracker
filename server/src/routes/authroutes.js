
import express from "express";

import {
  register,
  login,
  logout,
  getCurrentUser
} from "../controllers/authcontroller.js";

import { authenticate } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, getCurrentUser);

export default router;
