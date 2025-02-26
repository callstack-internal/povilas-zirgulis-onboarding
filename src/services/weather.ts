import axios from 'axios';
import {queryOptions} from '@tanstack/react-query';
import {Weather, WeatherListResponse} from '@utils/services.types';
import {CITIES_IDS} from '@utils/constants';
import {Location} from '@utils/location.types';
import Config from 'react-native-config';

export const apiInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    units: 'metric',
    appId: Config.WEATHER_API_KEY,
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
    const response = await apiInstance.get<Weather>(cityWeatherRoute, {
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
    const response = await apiInstance.get<Weather>(cityWeatherRoute, {
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
      console.error(error);
    }
  }
};
