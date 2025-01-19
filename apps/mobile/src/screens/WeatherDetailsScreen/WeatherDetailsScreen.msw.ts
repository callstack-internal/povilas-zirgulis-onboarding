import {http, HttpResponse} from 'msw';
import {server} from '@repo/apps/mobile/src/msw/server';
import {Weather} from '@repo/shared/src/types';
import {API_CONFIG} from '@repo/shared/src/constants';

export const setSuccessCityWeatherHandler = (cityWeatherResponse: Weather) => {
  server.use(
    http.get(API_CONFIG.routes.weather, () => {
      return HttpResponse.json(cityWeatherResponse);
    }),
  );
};

export const setErrorCityWeatherHandler = () => {
  server.use(
    http.get(API_CONFIG.routes.weather, () => {
      return HttpResponse.json(null, {status: 500});
    }),
  );
};

export const setupEmptyResultsHandler = () => {
  server.use(
    http.get(API_CONFIG.routes.weather, () => {
      return HttpResponse.json(null, {status: 200});
    }),
  );
};
