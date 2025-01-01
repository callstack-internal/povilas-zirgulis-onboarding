import axios from 'axios';
import {API_CONFIG} from '../constants';
import type {Weather, WeatherListResponse, Location} from '../types';

export function createWeatherApi(apiKey: string) {
  const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    params: {
      appId: apiKey,
      ...API_CONFIG.defaultParams,
    },
  });

  return {
    getCityWeather: async (id: number): Promise<Weather | undefined> => {
      try {
        const response = await api.get<Weather>(API_CONFIG.routes.weather, {
          params: {id},
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching city weather:', error);
        return undefined;
      }
    },

    getCurrentLocationWeather: async (
      location: Location,
    ): Promise<Weather | undefined> => {
      try {
        const response = await api.get<Weather>(API_CONFIG.routes.weather, {
          params: {
            lat: location.latitude,
            lon: location.longitude,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching location weather:', error);
        return undefined;
      }
    },

    getWeatherList: async (
      cityIds: number[],
    ): Promise<WeatherListResponse | undefined> => {
      try {
        const response = await api.get<WeatherListResponse>(
          API_CONFIG.routes.group,
          {
            params: {
              id: cityIds.join(','),
            },
          },
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching weather list:', error);
        return undefined;
      }
    },
  };
}
