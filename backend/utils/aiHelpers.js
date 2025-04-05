const { model } = require("../config/gemini");
const Route = require("../models/Route");

/**
 * Generate optimized route recommendations using Gemini AI
 * @param {string} origin - Origin location
 * @param {string} destination - Destination location
 * @param {string} travelMode - Mode of travel (BUS ONLY, TRAIN + BUS, etc.)
 * @param {Array} existingRoutes - Available routes from database
 * @returns {Promise<Array>} - AI enhanced route recommendations
 */
const getAIEnhancedRoutes = async (
  origin,
  destination,
  travelMode,
  existingRoutes
) => {
  try {
    // Create a prompt for the AI to analyze and optimize routes
    const prompt = `
      I need to travel from ${origin} to ${destination} using ${travelMode}.
      Here are the available routes:
      ${JSON.stringify(existingRoutes, null, 2)}
      
      Please analyze these routes and provide:
      1. The most time-efficient route
      2. The most cost-effective route
      3. Any additional route recommendations or optimizations
      4. Suggested last-mile connectivity options
      
      Format your response as valid JSON with an array called "enhancedRoutes" containing route objects.
    `;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    let enhancedRoutes = [];
    try {
      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[0]);
        enhancedRoutes = jsonData.enhancedRoutes || [];
      } else {
        // Fallback to using existing routes
        enhancedRoutes = existingRoutes;
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      enhancedRoutes = existingRoutes;
    }

    return enhancedRoutes;
  } catch (error) {
    console.error("Error using Gemini AI:", error);
    // Return the original routes if AI enhancement fails
    return existingRoutes;
  }
};

/**
 * Generate travel insights and tips for a specific route
 * @param {Object} route - Route details
 * @returns {Promise<Object>} - Travel insights
 */
const getRouteTravelInsights = async (route) => {
  try {
    const prompt = `
      I'm traveling from ${route.origin} to ${route.destination} by bus.
      The journey takes approximately ${route.estimatedTime}.
      
      Please provide:
      1. Weather considerations for this route
      2. Best times to travel
      3. Any local customs or travel tips
      4. Popular stopover points
      5. Safety recommendations
      
      Format your response as valid JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    let insights = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        insights = JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing AI insights response:", error);
      insights = {
        error: "Could not generate insights at this time",
      };
    }

    return insights;
  } catch (error) {
    console.error("Error generating travel insights:", error);
    return {
      error: "Could not generate insights at this time",
    };
  }
};

module.exports = {
  getAIEnhancedRoutes,
  getRouteTravelInsights,
};
