const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesData = require("./routes.json");
const Route = require("../models/Route");
const connectDB = require("../config/db");

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const importData = async () => {
  try {
    // Clean existing data
    await Route.deleteMany();

    // Add new data
    await Route.insertMany(routesData);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Route.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
