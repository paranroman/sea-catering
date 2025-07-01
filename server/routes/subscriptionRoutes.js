import express from "express";
import { createSubscription, checkUserSubscription } from "../controllers/subscriptionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check", verifyToken, checkUserSubscription);
router.post("/", verifyToken, createSubscription);

export default router;
