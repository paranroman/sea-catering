import express from 'express';
import { getAdminMetrics } from '../controllers/adminController.js';
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js';

const router = express.Router();

router.get('/metrics', verifyToken, isAdminMiddleware, getAdminMetrics);

export default router;