import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config';
import { logger } from '../utils/logger';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface JourneyPreferences {
  budget?: string;
  travelTime?: string;
  comfort?: string;
  additionalNeeds?: string[];
}

interface JourneyRecommendations {
  recommendedRoute: string;
  alternativeRoutes?: string;
  travelTips?: string;
  specialConsiderations?: string;
}

export const geminiService = {
  /**
   * Generate insights for a specific route using Gemini
   */
  generateRouteInsights: async (routeId: string, origin: string, destination: string) => {
    try {
      const prompt = `
      You are an AI travel assistant for a bus booking platform in India called Hackbite.
      
      I need you to provide detailed insights about a bus route from ${origin} to ${destination} (Route ID: ${routeId}).
      
      Please provide concise but helpful information in the following format:
      
      - Overview: A brief overview of this route, including distance and typical travel time
      - Best Time to Travel: When is the optimal time to travel on this route and why
      - Weather Considerations: Current or seasonal weather patterns that travelers should be aware of
      - Tourist Attractions: Notable places to visit along this route or at the destination
      - Travel Tips: Practical advice for travelers taking this specific route
      
      Keep the response concise but informative, focusing on providing actually useful information.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response and format it
      const formattedInsights = parseInsightsResponse(text);
      
      return formattedInsights;
    } catch (error) {
      logger.error('Error generating route insights with Gemini:', error);
      throw error;
    }
  },

  /**
   * Generate journey recommendations based on user preferences
   */
  generateJourneyRecommendations: async (
    origin: string, 
    destination: string, 
    preferences?: JourneyPreferences
  ): Promise<JourneyRecommendations> => {
    try {
      // Format the preferences for the prompt
      const preferencesText = preferences 
        ? `
        Budget preference: ${preferences.budget || 'Not specified'}
        Travel time preference: ${preferences.travelTime || 'Not specified'}
        Comfort level preference: ${preferences.comfort || 'Not specified'}
        Additional needs: ${preferences.additionalNeeds?.join(', ') || 'None'}
        `
        : 'No specific preferences provided.';

      const prompt = `
      You are an AI travel assistant for Hackbite, an Indian bus booking platform.
      
      I need you to provide personalized journey recommendations for traveling from ${origin} to ${destination} based on the following preferences:
      
      ${preferencesText}
      
      Please provide your response in the following JSON format:
      {
        "recommendedRoute": "Detailed description of the best recommended route option considering the preferences",
        "alternativeRoutes": "Description of 1-2 alternative routes that might also suit the traveler",
        "travelTips": "Practical tips related to this journey",
        "specialConsiderations": "Any special considerations based on the user's preferences and needs"
      }
      
      Make sure your recommendations are specific, practical, and tailored to the user's preferences.
      Only include the JSON in your response, with no additional text.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        // Attempt to parse the JSON response
        const jsonMatch = text.match(/```json\s*({[\s\S]*?})\s*```/) || 
                          text.match(/{[\s\S]*?}/);
                          
        if (jsonMatch) {
          const jsonText = jsonMatch[1] || jsonMatch[0];
          return JSON.parse(jsonText.trim());
        }
        
        // Fallback to a structured response if JSON parsing fails
        return {
          recommendedRoute: "We couldn't generate a specific recommendation. Please try again with more details.",
          travelTips: "Consider checking the weather forecast before traveling."
        };
      } catch (parseError) {
        logger.error('Error parsing Gemini response as JSON:', parseError);
        // Return a structured fallback response
        return {
          recommendedRoute: text.substring(0, 500) + '...',
          travelTips: "Consider checking the weather forecast and road conditions before traveling."
        };
      }
    } catch (error) {
      logger.error('Error generating journey recommendations with Gemini:', error);
      throw error;
    }
  }
};

/**
 * Parse the insights response from Gemini
 */
function parseInsightsResponse(text: string) {
  // Basic parsing logic to extract sections from Gemini's response
  const sections = {
    overview: extractSection(text, 'Overview:', 'Best Time to Travel:'),
    bestTimeToTravel: extractSection(text, 'Best Time to Travel:', 'Weather Considerations:'),
    weatherConsiderations: extractSection(text, 'Weather Considerations:', 'Tourist Attractions:'),
    touristAttractions: extractSection(text, 'Tourist Attractions:', 'Travel Tips:'),
    travelTips: extractSection(text, 'Travel Tips:', null)
  };

  return sections;
}

/**
 * Extract a section from the text between two markers
 */
function extractSection(text: string, startMarker: string, endMarker: string | null): string {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const startWithMarker = startIndex + startMarker.length;
  
  if (endMarker === null) {
    return text.substring(startWithMarker).trim();
  }
  
  const endIndex = text.indexOf(endMarker, startWithMarker);
  if (endIndex === -1) return text.substring(startWithMarker).trim();
  
  return text.substring(startWithMarker, endIndex).trim();
} 