import express from 'express';
import protectedRoute from '../middleware/authMiddleware';
import { getMesssagesByUserId, getUserForSidebar, sendMessage } from '../controller/messageController';

const router = express.Router();

router.get('/users', protectedRoute, getUserForSidebar);
router.get("/:id", protectedRoute, getMesssagesByUserId);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;