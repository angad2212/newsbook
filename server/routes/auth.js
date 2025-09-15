import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authController from "../controllers/auth.js";

// Create the router instance
const router = express.Router();

// Destructure your controller functions
const { register, login, getProfile, updateProfile, updateInterests } = authController;

// Routes
router.post("/signup", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, updateProfile);
router.put("/interests", authMiddleware, updateInterests);

export default router;
