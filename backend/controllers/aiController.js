const Route = require("../models/Route");
const {
  getAIEnhancedRoutes,
  getRouteTravelInsights,
} = require("../utils/aiHelpers");

/**
 * @desc    Get AI-enhanced route recommendations
 * @route   GET /api/ai/routes/:origin/:destination
 * @access  Public
 */
const getEnhancedRoutes = async (req, res) => {
  try {
    const { origin, destination } = req.params;
    const { travelMode } = req.query;

    // First, get existing routes from database
    let dbRoutes = await Route.find({
      origin: { $regex: new RegExp(`^${origin}$`, "i") },
      destination: { $regex: new RegExp(`^${destination}$`, "i") },
    });

    // If no routes found, try a more lenient search
    if (dbRoutes.length === 0) {
      dbRoutes = await Route.find({
        origin: { $regex: new RegExp(origin, "i") },
        destination: { $regex: new RegExp(destination, "i") },
      });
    }

    // If still no routes found, return an appropriate message
    if (dbRoutes.length === 0) {
      return res
        .status(404)
        .json({ message: "No routes found for this journey" });
    }

    // Get AI-enhanced routes
    const enhancedRoutes = await getAIEnhancedRoutes(
      origin,
      destination,
      travelMode || "BUS ONLY",
      dbRoutes
    );

    res.json({
      success: true,
      count: enhancedRoutes.length,
      data: enhancedRoutes,
    });
  } catch (error) {
    console.error("Error in getEnhancedRoutes:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message,
    });
  }
};

/**
 * @desc    Get AI-generated travel insights for a route
 * @route   GET /api/ai/insights/:routeId
 * @access  Public
 */
const getRouteInsights = async (req, res) => {
  try {
    const { routeId } = req.params;

    // Find the route in database
    const route = await Route.findById(routeId);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    // Get AI-generated insights
    const insights = await getRouteTravelInsights(route);

    res.json({
      success: true,
      data: {
        route: {
          id: route._id,
          origin: route.origin,
          destination: route.destination,
        },
        insights,
      },
    });
  } catch (error) {
    console.error("Error in getRouteInsights:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message,
    });
  }
};

/**
 * @desc    Get AI-generated journey recommendations
 * @route   POST /api/ai/recommendations
 * @access  Public
 */
const getJourneyRecommendations = async (req, res) => {
  try {
    const { origin, destination, preferences } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: "Origin and destination are required",
      });
    }

    // Get all routes for this journey
    const routes = await Route.find({
      origin: { $regex: new RegExp(origin, "i") },
      destination: { $regex: new RegExp(destination, "i") },
    });

    // Use the Gemini model to generate recommendations
    const { model } = require("../config/gemini");

    const prompt = `
      I'm planning a journey from ${origin} to ${destination}.
      ${
        preferences
          ? `My travel preferences: ${JSON.stringify(preferences)}`
          : ""
      }
      
      Available routes:
      ${JSON.stringify(routes, null, 2)}
      
      Please provide:
      1. The recommended route based on my preferences
      2. Alternative routes with pros and cons
      3. Travel tips for this journey
      4. Any special considerations for this route
      
      Format your response as valid JSON with these exact keys: recommendedRoute, alternativeRoutes, travelTips, specialConsiderations
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let recommendations = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing AI recommendations:", error);
      recommendations = {
        error: "Could not parse recommendations",
        rawResponse: text,
      };
    }

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error("Error in getJourneyRecommendations:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: error.message,
    });
  }
};

module.exports = {
  getEnhancedRoutes,
  getRouteInsights,
  getJourneyRecommendations,
};
