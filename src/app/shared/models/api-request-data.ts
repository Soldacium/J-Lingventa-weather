export interface CityCoordinates {
  latitude: number;
  longitude: number;
}

export interface ApiRequestData {
  coordinates: CityCoordinates;
  daysBack: number;
}
