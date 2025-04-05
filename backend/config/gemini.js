const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model (Gemini Pro)
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports = {
  model,
  genAI,
};
