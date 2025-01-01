export const CITIES_IDS = [
  2643743, // London
  5128581, // New York
  1850147, // Tokyo
  2950159, // Berlin
  2988507, // Paris
];

export const API_CONFIG = {
  baseURL: 'https://api.openweathermap.org/data/2.5',
  routes: {
    weather: '/weather',
    group: '/group',
  },
  defaultParams: {
    units: 'metric',
  },
};

export const COLORS = {
  primary: '#1e88e5',
  secondary: '#ff4081',
  white: '#ffffff',
  black: '#000000',
  grey: '#e0e0e0',
  darkGrey: '#757575',
  error: '#d32f2f',
} as const;
