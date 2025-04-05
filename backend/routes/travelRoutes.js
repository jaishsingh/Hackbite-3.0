const express = require("express");
const router = express.Router();
const Route = require("../models/Route");

// Get all routes
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find({});
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get routes by origin and destination
router.get("/:origin/:destination", async (req, res) => {
  const { origin, destination } = req.params;

  try {
    const routes = await Route.find({
      origin: { $regex: new RegExp(`^${origin}$`, "i") },
      destination: { $regex: new RegExp(`^${destination}$`, "i") },
    });

    if (routes.length > 0) {
      res.json(routes);
    } else {
      res.status(404).json({ message: "No routes found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new route
router.post("/", async (req, res) => {
  const route = new Route({
    routeName: req.body.routeName,
    origin: req.body.origin,
    destination: req.body.destination,
    estimatedTime: req.body.estimatedTime,
    fare: req.body.fare,
  });

  try {
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a route
router.put("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a route
router.delete("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
