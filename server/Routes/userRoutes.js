import express from "express";
import { getUserProfile } from "../Controllers/UserController.js";
import requireAuth from "../Middlware/requireAuth.js";

const router = express.Router();

// Protected route
router.get("/me", requireAuth, getUserProfile);

export default router;
