import express from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonialController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", verifyToken, createTestimonial);

export default router;