// Example shared types
export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

// Example shared constants
export const API_VERSION = 'v1';

// Example shared utilities
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  return `${temp}°${unit}`;
}
