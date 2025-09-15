import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { register, login, getProfile, updateProfile, updateInterests } from "../controllers/auth.js"; 

const router = express.Router();

router.use("/signup", register)
router.use("/login", login)
router.use("/profile", authMiddleware, getProfile)
router.use("/profile/update", authMiddleware, updateProfile)
router.use("/interests", updateInterests)

export default router;