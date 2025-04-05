import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface RouteInsightsProps {
  routeId: string;
  origin: string;
  destination: string;
}

// Mock insights data for demonstration
const getMockInsights = (origin: string, destination: string) => {
  return {
    overview: `This ${Math.floor(Math.random() * 400) + 200}km route typically takes around ${Math.floor(Math.random() * 8) + 4} hours by bus, depending on traffic and road conditions.`,
    bestTimeToTravel: `The best time to travel from ${origin} to ${destination} is during early morning or late evening to avoid traffic congestion. Winter months (October-February) offer the most pleasant weather for travel.`,
    weatherConsiderations: `${destination} experiences hot summers (March-June) with temperatures reaching 40°C. Monsoon season (July-September) may cause delays due to heavy rainfall. Winter (October-February) is mild and pleasant for travel.`,
    touristAttractions: `Several notable attractions along this route include temples, historical sites, and natural landmarks. ${destination} is famous for its rich cultural heritage, temples, and the scenic ghats along the river.`,
    travelTips: `Carry sufficient water and snacks for the journey. Book tickets in advance during peak tourist seasons. Keep valuables secure and stay hydrated, especially during summer travel.`
  };
};

const RouteInsights: React.FC<RouteInsightsProps> = ({ routeId, origin, destination }) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with a delay
    const fetchInsights = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Use mock data instead of API call
        const mockData = getMockInsights(origin, destination);
        setInsights(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching route insights:', err);
        setError('Could not load travel insights at this time.');
      } finally {
        setLoading(false);
      }
    };

    if (routeId) {
      fetchInsights();
    }
  }, [routeId, origin, destination]);

  if (loading) {
    return (
      <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h6" gutterBottom>
          Loading Travel Insights...
        </Typography>
        <LinearProgress color="primary" sx={{ mt: 2 }} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h6" gutterBottom>
          Travel Insights
        </Typography>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  // Handle the case where insights might not be in expected format
  if (!insights || typeof insights !== 'object') {
    return (
      <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h6" gutterBottom>
          Travel Insights
        </Typography>
        <Typography>
          No detailed insights available for this route at the moment.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Typography variant="h5" gutterBottom>
        Travel Insights: {origin} to {destination}
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <WbSunnyIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Weather Considerations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{insights.weatherConsiderations}</Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccessTimeIcon sx={{ mr: 1, color: 'secondary.main' }} />
          <Typography variant="h6">Best Times to Travel</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{insights.bestTimeToTravel}</Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FlagIcon sx={{ mr: 1, color: 'info.main' }} />
          <Typography variant="h6">Local Customs & Tips</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{insights.travelTips}</Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <LocationOnIcon sx={{ mr: 1, color: 'success.main' }} />
          <Typography variant="h6">Popular Attractions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{insights.touristAttractions}</Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SecurityIcon sx={{ mr: 1, color: 'error.main' }} />
          <Typography variant="h6">Route Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{insights.overview}</Typography>
        </AccordionDetails>
      </Accordion>
      
      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip label="AI-Generated Insights" color="primary" />
        <Chip label={`${origin} to ${destination}`} variant="outlined" />
      </Box>
    </Paper>
  );
};

export default RouteInsights; 