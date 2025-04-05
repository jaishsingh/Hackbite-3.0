import axios from 'axios';
import { BusRoute } from '../types';

// Create axios instance
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Travel routes API functions
export const travelApi = {
  // Get routes by origin and destination
  getRoutes: async (origin: string, destination: string): Promise<BusRoute[]> => {
    try {
      const response = await api.get(`/api/travel/${origin}/${destination}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching routes:', error);
      return [];
    }
  },
  
  // Get all available routes
  getAllRoutes: async (): Promise<BusRoute[]> => {
    try {
      const response = await api.get('/api/travel');
      return response.data;
    } catch (error) {
      console.error('Error fetching all routes:', error);
      return [];
    }
  },
  
  // Create a new route
  createRoute: async (routeData: Omit<BusRoute, 'id'>): Promise<BusRoute | null> => {
    try {
      const response = await api.post('/api/travel', routeData);
      return response.data;
    } catch (error) {
      console.error('Error creating route:', error);
      return null;
    }
  },
  
  // Update an existing route
  updateRoute: async (id: string, routeData: Partial<BusRoute>): Promise<BusRoute | null> => {
    try {
      const response = await api.put(`/api/travel/${id}`, routeData);
      return response.data;
    } catch (error) {
      console.error('Error updating route:', error);
      return null;
    }
  },
  
  // Delete a route
  deleteRoute: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/api/travel/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting route:', error);
      return false;
    }
  }
}; 