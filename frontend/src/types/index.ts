export interface BusRoute {
  id: string;
  routeName: string;
  origin: string;
  destination: string;
  estimatedTime: string;
  fare: number;
  operator: string;
  lastMile: LastMileOption;
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