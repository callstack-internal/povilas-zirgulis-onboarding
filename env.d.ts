declare module '@env' {
  export const WEATHER_API_KEY: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    WEATHER_API_KEY: string;
  }
}
