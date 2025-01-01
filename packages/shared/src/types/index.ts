export interface Weather {
  id: number;
  name: string;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  coord: {
    lon: number;
    lat: number;
  };
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface WeatherListResponse {
  cnt: number;
  list: Weather[];
}
