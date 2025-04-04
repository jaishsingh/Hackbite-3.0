import React, { useState } from 'react';
import { Container, Typography, Box, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import SearchForm from './components/SearchForm';
import RouteCard from './components/RouteCard';
import { mockBusRoutes } from './data/mockData';
import { BusRoute } from './types';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BalanceIcon from '@mui/icons-material/Balance';
import { statesAndUTs } from './data/indianStates';

type SortType = 'price' | 'time' | 'balanced';

function App() {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [sortType, setSortType] = useState<SortType>('balanced');

  const getHours = (time: string) => parseInt(time.split(' ')[0]);

  const handleSearch = (origin: string, destination: string) => {
    let filteredRoutes = mockBusRoutes.filter(
      route => 
        route.origin.toLowerCase().includes(origin.toLowerCase()) &&
        route.destination.toLowerCase().includes(destination.toLowerCase())
    );

    // Sort routes based on selected criteria
    filteredRoutes = sortRoutes(filteredRoutes, sortType);
    setRoutes(filteredRoutes);
  };

  const sortRoutes = (routes: BusRoute[], type: SortType) => {
    return [...routes].sort((a, b) => {
      switch (type) {
        case 'price':
          return (a.fare + a.lastMile.fare) - (b.fare + b.lastMile.fare);
        case 'time':
          const aTotalTime = getHours(a.estimatedTime) + getHours(a.lastMile.estimatedTime);
          const bTotalTime = getHours(b.estimatedTime) + getHours(b.lastMile.estimatedTime);
          return aTotalTime - bTotalTime;
        case 'balanced':
          const timeScore = (getHours(a.estimatedTime) - getHours(b.estimatedTime));
          const priceScore = ((a.fare + a.lastMile.fare) - (b.fare + b.lastMile.fare)) / 100;
          return timeScore + priceScore;
        default:
          return 0;
      }
    });
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Layer */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${process.env.PUBLIC_URL}/travel-image.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1.5)', // Increase brightness
          zIndex: -1 // Send to back
        }}
      />

      {/* Content Layer */}
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            color: '#1a237e', // Deep blue color
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            mb: 4
          }}
        >
          🚌 Journey Planner 🗺️
        </Typography>
        
        <SearchForm onSearch={handleSearch} />
        
        {routes.length > 0 && (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              mt: 4, 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sort Routes By:
            </Typography>
            <ToggleButtonGroup
              value={sortType}
              exclusive
              onChange={(_, newValue) => {
                if (newValue !== null) {
                  setSortType(newValue);
                  setRoutes(sortRoutes(routes, newValue));
                }
              }}
              sx={{ mb: 2 }}
            >
              <ToggleButton value="price">
                <AttachMoneyIcon sx={{ mr: 1 }} /> Best Price
              </ToggleButton>
              <ToggleButton value="time">
                <AccessTimeIcon sx={{ mr: 1 }} /> Fastest
              </ToggleButton>
              <ToggleButton value="balanced">
                <BalanceIcon sx={{ mr: 1 }} /> Balanced
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        )}
        
        <Box sx={{ mt: 4 }}>
          {routes.length > 0 ? (
            routes.map(route => (
              <RouteCard key={route.id} route={route} />
            ))
          ) : (
            <Typography 
              variant="h5" 
              align="center" 
              sx={{ 
                color: '#333', // Dark color for the text
                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)', // Optional: add a light shadow for contrast
                mt: 8 
              }}
            >
              🔍 Enter your journey details to find the perfect route! ✨
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
