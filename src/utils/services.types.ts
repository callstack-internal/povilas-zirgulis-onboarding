export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  sys: {
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  id: number;
  name: string;
};

export type WeatherListResponse = {
  list: Weather[];
  cnt: number;
};
