import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RouteDetails from './pages/RouteDetails';
import FindRoutePage from './pages/FindRoutePage';
import AllRoutesPage from './pages/AllRoutesPage';
import PlanJourney from './pages/PlanJourney';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary" sx={{ mb: 2 }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <DirectionsBusIcon sx={{ mr: 1 }} />
              Journey Planner
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/" 
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/find-route" 
                startIcon={<SearchIcon />}
              >
                Find Route
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/plan-journey" 
                startIcon={<MapIcon />}
              >
                AI Planner
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-route" element={<FindRoutePage />} />
        <Route path="/route-details" element={<RouteDetails />} />
        <Route path="/all-routes" element={<AllRoutesPage />} />
        <Route path="/plan-journey" element={<PlanJourney />} />
      </Routes>
    </Router>
  );
}

export default App;
