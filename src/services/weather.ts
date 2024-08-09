import axios from 'axios';
import {queryOptions} from '@tanstack/react-query';
import {Weather, WeatherListResponse} from '@utils/services.types';
import {CITIES_IDS} from '@utils/constants';

export const apiInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    units: 'metric',
    appId: process.env.WEATHER_API_KEY,
  },
});

export const cityWeatherRoute = '/weather';
export const weatherListRoute = '/group';

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
};

const fetchCityWeather = async (id: number) => {
  try {
    const response = await apiInstance.get<Weather>(cityWeatherRoute, {
      params: {
        id,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle error
    }
  }
};

const fetchWeatherList = async () => {
  try {
    const response = await apiInstance.get<WeatherListResponse>(
      weatherListRoute,
      {
        params: {
          id: CITIES_IDS.join(','),
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle error
    }
  }
};
