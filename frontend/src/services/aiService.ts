import axios from 'axios';
import { BusRoute } from '../types';
import { API_BASE_URL } from '../config';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

interface RouteInsightParams {
  routeId: string;
  origin: string;
  destination: string;
}

interface JourneyRecommendationParams {
  budget?: string;
  travelTime?: string;
  comfort?: string;
  additionalNeeds?: string[];
}

class AIService {
  private apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api/ai`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Get AI-enhanced route recommendations
   * @param origin - Origin location
   * @param destination - Destination location
   * @param travelMode - Mode of travel
   * @returns Promise containing route recommendations
   */
  async getEnhancedRoutes(
    origin: string,
    destination: string,
    travelMode: string
  ): Promise<BusRoute[]> {
    try {
      const response = await axios.get(
        `${API_URL}/ai/routes/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`,
        {
          params: { travelMode }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching AI enhanced routes:', error);
      throw error;
    }
  }

  async getRouteInsights({ routeId, origin, destination }: RouteInsightParams) {
    try {
      const response = await this.apiClient.get('/insights', {
        params: { routeId, origin, destination }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching route insights:', error);
      throw error;
    }
  }

  async getJourneyRecommendations(
    origin: string, 
    destination: string, 
    preferences?: JourneyRecommendationParams
  ) {
    try {
      const response = await this.apiClient.post('/recommendations', {
        origin,
        destination,
        preferences
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching journey recommendations:', error);
      throw error;
    }
  }
}

export const aiApi = new AIService(); 