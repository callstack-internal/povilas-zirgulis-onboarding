import {http, HttpResponse} from 'msw';
import {server} from '@msw/server';
import {Weather} from '@repo/apps/mobile/src/utils/services.types';
import {apiInstance, cityWeatherRoute} from '@services/weather';

const url = `${apiInstance.defaults.baseURL}${cityWeatherRoute}`;

export const setSuccessCityWeatherHandler = (cityWeatherResponse: Weather) => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(cityWeatherResponse);
    }),
  );
};

export const setErrorCityWeatherHandler = () => {
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
