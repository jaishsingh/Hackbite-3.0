import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ExploreIcon from '@mui/icons-material/Explore';
import PublicIcon from '@mui/icons-material/Public';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', py: 4 }}>
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
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            pt: 4
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: '#1a237e', // Deep blue color
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              mb: 2
            }}
          >
            🚌 Journey Planner 🗺️
          </Typography>
          <Typography 
            variant="h5" 
            color="textSecondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            Find the perfect bus routes for your journey across India
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/find-route')}
            sx={{ 
              py: 1.5, 
              px: 4, 
              fontSize: '1.2rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Find Your Route
          </Button>
        </Box>

        {/* Features Section */}
        <Stack direction="row" spacing={4} sx={{ mb: 6 }} flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, mb: { xs: 3, md: 0 } }}>
            <Paper elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
                <DirectionsBusIcon sx={{ fontSize: 40 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Comprehensive Routes
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" paragraph>
                  Find the best bus routes connecting cities across the country. Our extensive database includes routes from all major operators.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => navigate('/find-route')}
                >
                  Explore Routes
                </Button>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, mb: { xs: 3, md: 0 } }}>
            <Paper elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 3, bgcolor: 'secondary.main', color: 'white' }}>
                <ExploreIcon sx={{ fontSize: 40 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Last Mile Connectivity
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" paragraph>
                  Don't just reach the bus station - complete your journey with our integrated last-mile options including auto-rickshaws and shared rides.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => window.alert('Feature coming soon!')}
                >
                  Learn More
                </Button>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
            <Paper elevation={3} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 3, bgcolor: 'info.main', color: 'white' }}>
                <PublicIcon sx={{ fontSize: 40 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Journey Planning
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" paragraph>
                  Plan your entire journey with our comprehensive tools. Compare routes, check fares, and find the most convenient options.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="info"
                  onClick={() => navigate('/find-route')}
                >
                  Start Planning
                </Button>
              </Box>
            </Paper>
          </Box>
        </Stack>

        {/* Call to Action */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 6, 
            textAlign: 'center',
            background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
            color: 'white',
            borderRadius: 2
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Plan Your Journey?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: '800px', mx: 'auto' }}>
            Start searching for bus routes now and discover the most convenient way to reach your destination.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/find-route')}
            sx={{ 
              py: 1.5, 
              px: 4,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Find Route Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default HomePage; 