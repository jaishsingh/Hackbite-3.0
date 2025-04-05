/**
 * Configuration variables for the frontend application
 */

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Google Maps Configuration
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

// Feature Flags
export const ENABLE_AI_FEATURES = process.env.REACT_APP_ENABLE_AI_FEATURES === 'true' || true;

// Theme Configuration
export const DEFAULT_THEME_MODE = 'light'; // 'light' or 'dark' 