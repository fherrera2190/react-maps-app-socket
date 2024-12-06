import { useSocketMapBox } from "../hooks";

export const MapPages = () => {
  const { mapDiv, coords } = useSocketMapBox();

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>
      <div ref={mapDiv} className="mapContainer"></div>
    </>
  );
};
