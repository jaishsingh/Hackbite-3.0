import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Stack
} from '@mui/material';
import { BusRoute } from '../types';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';

interface RouteCardProps {
  route: BusRoute;
  onViewDetails: (route: BusRoute) => void;
  showType?: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onViewDetails, showType = true }) => {
  // Handle both old and new data formats
  const price = route.price || route.fare || 0;
  const routeName = route.routeName || `${route.origin} to ${route.destination}${route.routeNumber ? ` (${route.routeNumber})` : ''}`;
  const duration = route.duration || route.estimatedTime || '';
  
  return (
    <Card 
      sx={{ 
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
          <Typography variant="h6" component="div">
            {routeName}
          </Typography>
          
          {route.rating && (
            <Chip 
              icon={<StarIcon fontSize="small" />} 
              label={route.rating.toFixed(1)} 
              color="primary"
              size="small"
              variant="outlined"
            />
          )}
        </Stack>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DirectionsBusIcon color="action" fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {route.operator}
              {route.busType && ` • ${route.busType}`}
            </Typography>
          </Box>

          {duration && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon color="action" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{duration}</Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoneyIcon color="action" fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">₹{price}</Typography>
          </Box>
        </Box>

        {route.departureTime && route.arrivalTime && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="bold">{route.departureTime}</Typography>
              <Divider orientation="horizontal" flexItem sx={{ flexGrow: 1 }} />
              <Typography variant="body2" fontWeight="bold">{route.arrivalTime}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="text.secondary">{route.origin}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.secondary">{route.destination}</Typography>
            </Stack>
          </Box>
        )}

        {route.amenities && route.amenities.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Amenities:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {route.amenities.map((amenity, index) => (
                <Chip key={index} label={amenity} size="small" variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}

        {route.lastMile && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="medium" color="text.secondary">Last Mile:</Typography>
            <Typography variant="body2">
              {route.lastMile.mode} • {route.lastMile.distance} km • ₹{route.lastMile.fare} • {route.lastMile.estimatedTime}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {route.availableSeats !== undefined && (
            <Typography variant="body2" color={route.availableSeats < 10 ? 'error.main' : 'text.secondary'}>
              {route.availableSeats} {route.availableSeats === 1 ? 'seat' : 'seats'} available
            </Typography>
          )}
          
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<InfoOutlinedIcon />}
            onClick={() => onViewDetails(route)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteCard; 