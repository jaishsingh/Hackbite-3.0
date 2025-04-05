export interface LastMile {
  mode: string;
  distance: number;
  fare: number;
  availability: string;
  estimatedTime: string;
}

export interface BusRoute {
  id: string;
  routeNumber?: string;
  routeName?: string;
  origin: string;
  destination: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  estimatedTime?: string;
  price?: number;
  fare?: number;
  busType?: string;
  operator: string;
  availableSeats?: number;
  amenities?: string[];
  rating?: number;
  via?: string[];
  lastMile?: LastMile;
}

export interface LastMileOption {
  mode: 'Auto' | 'Walk' | 'Shared Jeep';
  distance: number;
  fare: number;
  availability: string;
  estimatedTime: string;
}

export interface JourneySummary {
  busRoute: BusRoute;
  totalDuration: string;
  totalFare: number;
} 