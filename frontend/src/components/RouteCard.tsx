import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider,
  Chip
} from '@mui/material';
import { BusRoute } from '../types';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface RouteCardProps {
  route: BusRoute;
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  return (
    <Card 
      sx={{ 
        mb: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid rgba(230, 230, 230, 0.5)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🚌 {route.routeName}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<AccessTimeIcon />}
            label={`⏱️ ${route.estimatedTime}`}
            color="primary"
          />
          <Chip 
            icon={<AttachMoneyIcon />}
            label={`💰 ₹${route.fare}`}
            color="secondary"
          />
          <Chip 
            label={`🚍 ${route.operator}`}
            variant="outlined"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main' }}>
          🚕 Last Mile Options
        </Typography>
        
        <Box sx={{ pl: 2, bgcolor: 'rgba(0, 0, 0, 0.03)', p: 2, borderRadius: 1 }}>
          <Typography variant="body2">
            🚗 Mode: {route.lastMile.mode}
          </Typography>
          <Typography variant="body2">
            📍 Distance: {route.lastMile.distance} km
          </Typography>
          <Typography variant="body2">
            💵 Fare: ₹{route.lastMile.fare}
          </Typography>
          <Typography variant="body2">
            ⏰ Time: {route.lastMile.estimatedTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ℹ️ {route.lastMile.availability}
          </Typography>
        </Box>

        <Box sx={{ 
          mt: 2, 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          borderRadius: 1 
        }}>
          <Typography variant="subtitle2">
            🎯 Total Journey Summary
          </Typography>
          <Typography variant="body2">
            ⏱️ Total Duration: {route.estimatedTime} + {route.lastMile.estimatedTime}
          </Typography>
          <Typography variant="body2">
            💰 Total Fare: ₹{route.fare + route.lastMile.fare}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteCard; 