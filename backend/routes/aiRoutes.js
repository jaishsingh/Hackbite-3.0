const express = require("express");
const router = express.Router();
const {
  getEnhancedRoutes,
  getRouteInsights,
  getJourneyRecommendations,
} = require("../controllers/aiController");

// Get AI-enhanced routes
router.get("/routes/:origin/:destination", getEnhancedRoutes);

// Get AI-generated insights for a specific route
router.get("/insights/:routeId", getRouteInsights);

// Get AI-generated journey recommendations
router.post("/recommendations", getJourneyRecommendations);

module.exports = router;
