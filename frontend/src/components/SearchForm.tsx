import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { statesAndUTs } from '../data/indianStates'; // Updated import path

interface SearchFormProps {
  onSearch: (origin: string, destination: string, travelMode: string, journeyDate: Date | null) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [originCity, setOriginCity] = useState('');
  const [originState, setOriginState] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [destinationState, setDestinationState] = useState('');
  const [travelMode, setTravelMode] = useState('BUS ONLY'); // Default travel mode
  const [journeyDate, setJourneyDate] = useState<Date | null>(null); // State for journey date

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const origin = `${originCity}, ${originState}`;
    const destination = `${destinationCity}, ${destinationState}`;
    onSearch(origin, destination, travelMode, journeyDate);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        maxWidth: 600, 
        mx: 'auto', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: 2,
        border: '1px solid rgba(230, 230, 230, 0.5)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          <DirectionsBusIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Travel Route Finder
        </Typography>
        
        {/* Origin Section */}
        <Typography variant="subtitle1">Origin:</Typography>
        <TextField
          label="City/Town"
          value={originCity}
          onChange={(e) => setOriginCity(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>State/UT</InputLabel>
          <Select
            value={originState}
            onChange={(e) => setOriginState(e.target.value)}
            required
            label="State/UT"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {statesAndUTs.map((state: { name: string; code: string }) => (
              <MenuItem key={state.code} value={state.name}>{state.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Destination Section */}
        <Typography variant="subtitle1">Destination:</Typography>
        <TextField
          label="City/Town"
          value={destinationCity}
          onChange={(e) => setDestinationCity(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>State/UT</InputLabel>
          <Select
            value={destinationState}
            onChange={(e) => setDestinationState(e.target.value)}
            required
            label="State/UT"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {statesAndUTs.map((state: { name: string; code: string }) => (
              <MenuItem key={state.code} value={state.name}>{state.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Journey Date Section */}
        <Typography variant="subtitle1">Journey Date:</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Journey Date"
            value={journeyDate}
            onChange={(newValue) => setJourneyDate(newValue)}
            minDate={new Date()} // Set minimum date to today
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))} // Set maximum date to 2 months from today
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                required: true
              }
            }}
          />
        </LocalizationProvider>
        
        {/* Travel Mode Selection */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Select Mode of Travel:</Typography>
          <RadioGroup
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
          >
            <FormControlLabel value="BUS ONLY" control={<Radio />} label="BUS ONLY" />
            <FormControlLabel value="TRAIN + BUS" control={<Radio />} label="TRAIN + BUS" />
            <FormControlLabel value="FLIGHT + BUS/AUTO" control={<Radio />} label="FLIGHT + BUS/AUTO" />
          </RadioGroup>
        </FormControl>
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Find Route
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchForm; 