export interface ApiResponseData {
  daily: {
    time: Array<string>;
    sunrise: Array<string>;
    sunset: Array<string>;
    rain_sum: Array<number | null>;
  };
  hourly: {
    precipitation: Array<number>;
    temperature_2m: Array<number>;
    time: Array<string>;
  };
}
