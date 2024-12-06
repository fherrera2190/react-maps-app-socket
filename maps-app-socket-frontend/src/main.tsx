import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MapsApp } from "./MapsApp";

if (!navigator.geolocation) {
  alert("Geolocation is not supported by your browser");
  throw new Error("Geolocation is not supported by your browser");
}

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = import.meta.env.VITE_KEY_APP;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>
);
