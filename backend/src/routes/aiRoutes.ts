import express from 'express';
import { aiController } from '../controllers/aiController';

const router = express.Router();

/**
 * @route   GET /api/ai/insights
 * @desc    Get AI-powered insights for a specific route
 * @access  Public
 */
router.get('/insights', aiController.getRouteInsights);

/**
 * @route   POST /api/ai/recommendations
 * @desc    Get AI-powered journey recommendations
 * @access  Public
 */
router.post('/recommendations', aiController.getJourneyRecommendations);

export default router; 