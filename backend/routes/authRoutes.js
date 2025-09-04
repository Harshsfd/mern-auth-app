import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { forgotPassword, resetPassword } from "../controllers/passwordController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);

export default router;
