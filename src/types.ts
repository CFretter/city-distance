export interface City {
  id: number;
  name: string;
  lat: number;
  lon: number;
  distance: number;
  type?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
} 