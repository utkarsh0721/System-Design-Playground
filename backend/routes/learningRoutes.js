import { Router } from 'express';
import * as controller from '../controllers/learningController.js';
import protect from '../middleware/auth.js';
import asyncHandler from '../utils/asyncHandler.js';
const router = Router();
router.use(protect);
router.get('/', asyncHandler(controller.list));
router.get('/:slug', asyncHandler(controller.detail));
export default router;
