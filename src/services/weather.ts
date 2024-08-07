import axios from 'axios';
import {queryOptions} from '@tanstack/react-query';
import {Weather} from '../utils/services.types';

const citiesIds = [
  703448, // Kyiv, UA
  692194, // Sumy, UA
  756135, // Warsaw, PL
  3081368, // Wrocław, PL
  3067696, // Prague, CZ
  3077916, // České Budějovice, CZ
  2950159, // Berlin, DE
  2867714, // Munich, DE
  3247449, // Aachen, DE
  5815135, // Washington, US
  5128581, // New York City, US
];

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
};

type WeatherListResponse = {
  list: Weather[];
  cnt: number;
};

const fetchWeatherList = async () => {
  const response = await apiInstance.get<WeatherListResponse>('/group', {
    params: {
      id: citiesIds.join(','),
    },
  });

  return response.data.list;
};
