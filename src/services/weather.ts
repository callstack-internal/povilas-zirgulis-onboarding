import axios from 'axios';
import {queryOptions} from '@tanstack/react-query';
import {Weather} from '@utils/services.types';
import {CITIES_IDS} from '@utils/constants';

const apiInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
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
};

type WeatherListResponse = {
  list: Weather[];
  cnt: number;
};

const fetchCityWeather = async (id: number) => {
  const response = await apiInstance.get<Weather>('/weather', {
    params: {
      id,
    },
  });

  return response.data;
};

const fetchWeatherList = async () => {
  const response = await apiInstance.get<WeatherListResponse>('/group', {
    params: {
      id: CITIES_IDS.join(','),
    },
  });

  return response.data.list;
};
