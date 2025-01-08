import axios from 'axios';
import {queryOptions} from '@tanstack/react-query';
import type {Weather, WeatherListResponse, Location} from '../types';
import {API_CONFIG} from '../constants';

export function createWeatherApi(apiKey: string) {
  const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    params: {
      appId: apiKey,
      ...API_CONFIG.defaultParams,
    },
  });

  return {
    weatherQueries: {
      weatherList: () =>
        queryOptions({
          queryKey: ['weatherList'],
          queryFn: () => fetchWeatherList(api),
        }),
      cityWeather: (id: number) =>
        queryOptions({
          queryKey: ['cityWeather', id],
          queryFn: () => fetchCityWeather(api, id),
        }),
      currentLocationWeather: (location: Location | undefined) =>
        queryOptions({
          queryKey: [
            'currentLocationWeather',
            location?.latitude,
            location?.longitude,
          ],
          queryFn: () => fetchCurrentLocationWeather(api, location),
          enabled: !!location,
        }),
    },
  };
}

const fetchCityWeather = async (
  api: ReturnType<typeof axios.create>,
  id: number,
) => {
  try {
    const response = await api.get<Weather>(API_CONFIG.routes.weather, {
      params: {id},
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    }
    throw error;
  }
};

const fetchCurrentLocationWeather = async (
  api: ReturnType<typeof axios.create>,
  location: Location | undefined,
) => {
  try {
    const response = await api.get<Weather>(API_CONFIG.routes.weather, {
      params: {
        lat: location?.latitude,
        lon: location?.longitude,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    }
    throw error;
  }
};

const fetchWeatherList = async (api: ReturnType<typeof axios.create>) => {
  try {
    const response = await api.get<WeatherListResponse>(
      API_CONFIG.routes.group,
      {
        params: {
          id: API_CONFIG.defaultCityIds.join(','),
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    }
    throw error;
  }
};
