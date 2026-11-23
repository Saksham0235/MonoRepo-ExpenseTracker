
import express from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsers
} from "../controllers/authcontroller.js";

import { authenticate } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, getCurrentUser);
router.get("/users", authenticate, getAllUsers);

export default router;
