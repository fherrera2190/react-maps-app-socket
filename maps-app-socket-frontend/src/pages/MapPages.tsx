import mapboxgl, { Map } from "mapbox-gl";
import { useLayoutEffect, useRef, useState } from "react";

const puntoInicial = {
  lng: 5,
  lat: 34,
  zoom:2.5,
};

export const MapPages = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();

  useLayoutEffect(() => {
    if (mapDiv.current) {
      const map = new mapboxgl.Map({
        container: mapDiv.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [puntoInicial.lng, puntoInicial.lat],
        zoom: puntoInicial.zoom,
      });
      setMap(map);
    }
  }, []);

  return (
    <>
      <div ref={mapDiv} className="mapContainer"></div>
    </>
  );
};
