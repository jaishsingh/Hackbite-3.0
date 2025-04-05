import React from 'react';
import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import JourneyRecommendations from '../components/JourneyRecommendations';
import { ENABLE_AI_FEATURES } from '../config';

const PlanJourney: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Plan Your Journey</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Plan Your Perfect Journey
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Use our AI-powered journey planner to get personalized recommendations based on your 
        preferences and travel needs. Simply enter your origin, destination, and preferences
        to get started.
      </Typography>

      {ENABLE_AI_FEATURES ? (
        <JourneyRecommendations />
      ) : (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">
            AI journey planning features are currently disabled.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please check back later or contact support for more information.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default PlanJourney; 