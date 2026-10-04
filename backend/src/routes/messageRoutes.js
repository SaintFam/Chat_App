import express from 'express';
import protectedRoute from '../middleware/authMiddleware';

const router = express.Router();

router.get('/users', protectedRoute, getUserForSidebar);

export default router;