import {Weather} from '../types';

export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  return `${Math.round(temp)}°${unit}`;
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function getLatestWeather(weather: Weather | undefined) {
  return weather?.weather.at(0);
}

export function formatWindSpeed(speed: number): string {
  return `${speed.toFixed(1)} m/s`;
}

export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

export function formatPressure(pressure: number): string {
  return `${pressure} hPa`;
}
