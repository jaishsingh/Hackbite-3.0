import { Request, Response } from 'express';
import { geminiService } from '../services/geminiService';
import { logger } from '../utils/logger';

interface JourneyRecommendationRequest {
  origin: string;
  destination: string;
  preferences?: {
    budget?: string;
    travelTime?: string;
    comfort?: string;
    additionalNeeds?: string[];
  };
}

export const aiController = {
  /**
   * Get AI-powered insights for a specific route
   */
  getRouteInsights: async (req: Request, res: Response) => {
    try {
      const { routeId, origin, destination } = req.query;
      
      if (!routeId || !origin || !destination) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: routeId, origin, and destination are required'
        });
      }
      
      const insights = await geminiService.generateRouteInsights(
        routeId as string, 
        origin as string, 
        destination as string
      );
      
      return res.status(200).json({
        success: true,
        data: insights
      });
    } catch (error) {
      logger.error('Error generating route insights:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate route insights'
      });
    }
  },

  /**
   * Get AI-powered journey recommendations
   */
  getJourneyRecommendations: async (req: Request, res: Response) => {
    try {
      const { origin, destination, preferences }: JourneyRecommendationRequest = req.body;
      
      if (!origin || !destination) {
        return res.status(400).json({
          success: false,
          message: 'Origin and destination are required'
        });
      }
      
      const recommendations = await geminiService.generateJourneyRecommendations(
        origin,
        destination,
        preferences
      );
      
      return res.status(200).json({
        success: true,
        data: recommendations
      });
    } catch (error) {
      logger.error('Error generating journey recommendations:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate journey recommendations'
      });
    }
  }
}; 