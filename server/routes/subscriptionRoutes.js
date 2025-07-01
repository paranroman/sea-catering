import express from "express";
import {
    createSubscription,
    checkUserSubscription,
    getUserSubscription,
    pauseSubscription,
    cancelSubscription,
    resumeSubscription,
} from "../controllers/subscriptionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check", verifyToken, checkUserSubscription);
router.post("/", verifyToken, createSubscription);
router.get("/user", verifyToken, getUserSubscription);

router.patch("/pause", verifyToken, pauseSubscription);
router.delete("/cancel", verifyToken, cancelSubscription);
router.patch("/resume", verifyToken, resumeSubscription);

export default router;
