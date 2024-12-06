import { Marker } from "mapbox-gl";

export interface Marks {
  [key: string]: Marker;
}


export interface MarkerResponse{
  id:string;
  lng: number;
  lat: number;
}