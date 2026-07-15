import { Router } from 'express';
import * as controller from '../controllers/userController.js';
import protect from '../middleware/auth.js';
import asyncHandler from '../utils/asyncHandler.js';
const router = Router();
router.use(protect);
router.get('/profile', asyncHandler(controller.getProfile));
router.patch('/profile', asyncHandler(controller.updateProfile));
export default router;
