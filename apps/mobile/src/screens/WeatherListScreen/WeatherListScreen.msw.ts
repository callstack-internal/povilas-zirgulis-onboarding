import {http, HttpResponse} from 'msw';
import {server} from '@msw/server';
import {WeatherListResponse} from '@repo/apps/mobile/src/utils/services.types';
import {apiInstance, weatherListRoute} from '@services/weather';

const url = `${apiInstance.defaults.baseURL}${weatherListRoute}`;

export const setSuccessWeatherListHandler = (
  weatherListResponse: WeatherListResponse,
) => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(weatherListResponse);
    }),
  );
};

export const setErrorWeatherListHandler = () => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(null, {status: 500});
    }),
  );
};

export const setupEmptyResultsHandler = () => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(null, {status: 200});
    }),
  );
};
