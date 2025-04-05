import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// Mock recommendation data generator
const generateMockRecommendations = (origin: string, destination: string, preferences: any) => {
  // Simulate a 2-second delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const budgetText = preferences.budget 
        ? `considering your ${preferences.budget} budget preferences`
        : 'with various budget options';
      
      const comfortText = preferences.comfort
        ? `with ${preferences.comfort} comfort level`
        : 'with standard comfort accommodations';
      
      const needsText = preferences.additionalNeeds?.length > 0
        ? `This route accounts for your needs: ${preferences.additionalNeeds.join(', ')}.`
        : '';
      
      resolve({
        recommendedRoute: `We recommend taking a direct bus from ${origin} to ${destination} ${budgetText}. The journey takes approximately ${Math.floor(Math.random() * 8) + 4} hours ${comfortText}. Buses depart regularly throughout the day, with particularly good options in the morning and evening. ${needsText}`,
        
        alternativeRoutes: `Alternative option: Take a train from ${origin} to halfway point, then connect to a bus for the final leg to ${destination}. This multi-mode option may be slower but offers more flexibility in timing and potentially better scenery.`,
        
        travelTips: `Best days to travel are weekdays to avoid weekend crowds. Book your tickets 3-4 days in advance for better rates. Carry sufficient water and some snacks for the journey. The route passes through some scenic locations, so try to get a window seat if possible.`,
        
        specialConsiderations: `The ${origin}-${destination} route has some road construction ongoing until the end of the month, which might cause minor delays. During monsoon season (June-September), some services may be affected by heavy rainfall.`
      });
    }, 2000);
  });
};

const JourneyRecommendations: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [comfort, setComfort] = useState('');
  const [additionalNeeds, setAdditionalNeeds] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  const handleNeedsChange = (need: string) => {
    if (additionalNeeds.includes(need)) {
      setAdditionalNeeds(additionalNeeds.filter(item => item !== need));
    } else {
      setAdditionalNeeds([...additionalNeeds, need]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin || !destination) {
      setError('Origin and destination are required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const preferences = {
        budget,
        travelTime,
        comfort,
        additionalNeeds: additionalNeeds.length > 0 ? additionalNeeds : undefined
      };
      
      // Use mock data instead of API call
      const data = await generateMockRecommendations(origin, destination, preferences);
      setRecommendations(data);
    } catch (err) {
      console.error('Error getting journey recommendations:', err);
      setError('Failed to fetch journey recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TravelExploreIcon sx={{ mr: 1, color: 'primary.main', fontSize: 30 }} />
        <Typography variant="h5">
          AI Journey Planner
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Get personalized journey recommendations powered by AI
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              fullWidth
              required
              placeholder="e.g., Delhi"
            />
            
            <TextField
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              fullWidth
              required
              placeholder="e.g., Manali"
            />
          </Stack>
          
          <Typography variant="subtitle1">Travel Preferences</Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Budget</InputLabel>
              <Select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                label="Budget"
              >
                <MenuItem value="">No preference</MenuItem>
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Travel Time</InputLabel>
              <Select
                value={travelTime}
                onChange={(e) => setTravelTime(e.target.value)}
                label="Travel Time"
              >
                <MenuItem value="">No preference</MenuItem>
                <MenuItem value="shortest">Shortest possible</MenuItem>
                <MenuItem value="daytime">Daytime travel</MenuItem>
                <MenuItem value="overnight">Overnight travel</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Comfort Level</InputLabel>
              <Select
                value={comfort}
                onChange={(e) => setComfort(e.target.value)}
                label="Comfort Level"
              >
                <MenuItem value="">No preference</MenuItem>
                <MenuItem value="basic">Basic</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="luxury">Luxury</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          
          <FormGroup>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Additional Needs:</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={additionalNeeds.includes('wheelchair')}
                    onChange={() => handleNeedsChange('wheelchair')}
                  />
                }
                label="Wheelchair Accessible"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={additionalNeeds.includes('luggage')}
                    onChange={() => handleNeedsChange('luggage')}
                  />
                }
                label="Extra Luggage"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={additionalNeeds.includes('pets')}
                    onChange={() => handleNeedsChange('pets')}
                  />
                }
                label="Pet Friendly"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={additionalNeeds.includes('food')}
                    onChange={() => handleNeedsChange('food')}
                  />
                }
                label="Food Options"
              />
            </Stack>
          </FormGroup>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading || !origin || !destination}
          >
            Get Recommendations
          </Button>
        </Stack>
      </Box>
      
      {loading && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" gutterBottom>
            Analyzing journey options...
          </Typography>
          <LinearProgress />
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
      
      {recommendations && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Journey Recommendations
          </Typography>
          
          <Divider sx={{ mb: 2 }} />
          
          {recommendations.recommendedRoute && (
            <Card sx={{ mb: 3, border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6">
                    Recommended Route
                  </Typography>
                  <Chip label="Best Match" color="primary" />
                </Box>
                <Typography variant="body1">
                  {recommendations.recommendedRoute}
                </Typography>
              </CardContent>
            </Card>
          )}
          
          {recommendations.alternativeRoutes && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Alternative Routes
                </Typography>
                <Typography variant="body1">
                  {recommendations.alternativeRoutes}
                </Typography>
              </CardContent>
            </Card>
          )}
          
          {recommendations.travelTips && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Travel Tips
                </Typography>
                <Typography variant="body1">
                  {recommendations.travelTips}
                </Typography>
              </CardContent>
            </Card>
          )}
          
          {recommendations.specialConsiderations && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Special Considerations
                </Typography>
                <Typography variant="body1">
                  {recommendations.specialConsiderations}
                </Typography>
              </CardContent>
            </Card>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Chip 
              label="AI-Powered Recommendations" 
              color="secondary" 
              variant="outlined" 
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default JourneyRecommendations; 