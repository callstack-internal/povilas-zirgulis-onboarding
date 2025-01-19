import axios from 'axios';
import {queryOptions} from '@tanstack/react-query';
import {Weather, WeatherListResponse, Location} from '../types';
import {API_CONFIG, CITIES_IDS} from '../constants';

export const apiInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  params: {
    units: 'metric',
    appId: process.env.WEATHER_API_KEY,
  },
});

export const weatherQueries = {
  weatherList: () =>
    queryOptions({
      queryKey: ['weatherList'],
      queryFn: fetchWeatherList,
    }),
  cityWeather: (id: number) =>
    queryOptions({
      queryKey: ['cityWeather', id],
      queryFn: () => fetchCityWeather(id),
    }),
  currentLocationWeather: (location: Location | undefined) =>
    queryOptions({
      queryKey: [
        'currentLocationWeather',
        location?.latitude,
        location?.longitude,
      ],
      queryFn: () => fetchCurrentLocationWeather(location),
      enabled: !!location,
    }),
};

const fetchCityWeather = async (id: number) => {
  try {
    const response = await apiInstance.get<Weather>(API_CONFIG.routes.weather, {
      params: {
        id,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    }
  }
};

const fetchCurrentLocationWeather = async (location: Location | undefined) => {
  try {
    const response = await apiInstance.get<Weather>(API_CONFIG.routes.weather, {
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
  }
};

const fetchWeatherList = async () => {
  try {
    const response = await apiInstance.get<WeatherListResponse>(
      API_CONFIG.routes.group,
      {
        params: {
          id: CITIES_IDS.join(','),
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    }
  }
};
