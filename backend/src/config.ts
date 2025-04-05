import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  // Server configuration
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hackbite',
  
  // JWT Authentication
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // Google API keys
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  
  // Gemini AI
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  
  // Payment Gateway (e.g., Razorpay)
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
};

export default config; 