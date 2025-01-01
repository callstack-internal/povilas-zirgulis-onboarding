import {faker} from '@faker-js/faker';

export const getWeatherMockData = () => {
  return {
    coord: {
      lon: faker.location.longitude(),
      lat: faker.location.latitude(),
    },
    sys: {
      country: faker.location.countryCode(),
      timezone: faker.number.int({min: -43200, max: 50400}),
      sunrise: faker.date.future().getTime(),
      sunset: faker.date.future().getTime(),
    },
    weather: [
      {
        id: faker.number.int({min: 200, max: 800}),
        main: faker.helpers.arrayElement([
          'Clear',
          'Clouds',
          'Rain',
          'Drizzle',
          'Thunderstorm',
          'Snow',
        ]),
        description: faker.helpers.arrayElement([
          'clear sky',
          'few clouds',
          'scattered clouds',
          'broken clouds',
          'shower rain',
          'rain',
          'thunderstorm',
          'snow',
        ]),
        icon: faker.helpers.arrayElement([
          '01d',
          '02d',
          '03d',
          '04d',
          '09d',
          '10d',
          '11d',
          '13d',
          '50d',
        ]),
      },
    ],
    main: {
      temp: faker.number.float({min: -30, max: 50, multipleOf: 0.1}),
      feels_like: faker.number.float({min: -30, max: 50, multipleOf: 0.1}),
      temp_min: faker.number.float({min: -30, max: 50, multipleOf: 0.1}),
      temp_max: faker.number.float({min: -30, max: 50, multipleOf: 0.1}),
      pressure: faker.number.int({min: 950, max: 1050}),
      sea_level: faker.number.int({min: 950, max: 1050}),
      grnd_level: faker.number.int({min: 950, max: 1050}),
      humidity: faker.number.int({min: 0, max: 100}),
    },
    visibility: faker.number.int({min: 0, max: 10000}),
    wind: {
      speed: faker.number.float({min: 0, max: 40, multipleOf: 0.01}),
      deg: faker.number.int({min: 0, max: 360}),
    },
    clouds: {
      all: faker.number.int({min: 0, max: 100}),
    },
    dt: faker.date.recent().getTime() / 1000,
    id: faker.number.int({min: 100000, max: 999999}),
    name: faker.location.city(),
  };
};

export const generateWeatherListMockData = () => {
  return {
    cnt: 2,
    list: [getWeatherMockData(), getWeatherMockData()],
  };
};
