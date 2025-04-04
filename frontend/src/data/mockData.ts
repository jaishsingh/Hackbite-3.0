import { BusRoute } from '../types';

export const mockBusRoutes: BusRoute[] = [
  {
    id: '1',
    routeName: 'Delhi to Aut via HRTC Volvo',
    origin: 'Delhi',
    destination: 'Aut',
    estimatedTime: '12 hrs',
    fare: 800,
    operator: 'HRTC',
    lastMile: {
      mode: 'Auto',
      distance: 12,
      fare: 150,
      availability: 'Available outside Aut Bus Stop',
      estimatedTime: '2 hrs'
    }
  },
  {
    id: '2',
    routeName: 'Delhi to Manali via UPSRTC',
    origin: 'Delhi',
    destination: 'Manali',
    estimatedTime: '14 hrs',
    fare: 1000,
    operator: 'UPSRTC',
    lastMile: {
      mode: 'Shared Jeep',
      distance: 8,
      fare: 100,
      availability: 'Available at Manali Bus Stand',
      estimatedTime: '1 hr'
    }
  }
]; 