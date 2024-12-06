import { useContext, useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";
import SocketContext from "../context/SocketContex";
import { Marker } from "mapbox-gl";
const puntoInicial = {
  lng: -65.28,
  lat: -24.21,
  zoom: 13.5,
};

export const MapPages = () => {
  const { mapDiv, coords, newMarker$, movMarker$, addMarker } =
    useMapbox(puntoInicial);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("active-markers", (data) => {
      //console.log("MapaPage", data);

      for (const key of Object.keys(data)) {
        console.log(data[key]);
        addMarker(data[key], key);
      }
    });
  }, [socket, addMarker]);

  useEffect(() => {
    newMarker$.subscribe((mark) => {
      socket.emit("new-marker", mark);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    movMarker$.subscribe((mark) => {
      console.log("MapaPage", mark);
    });
  }, [movMarker$]);

  useEffect(() => {
    socket.on("new-marker", (marker: Marker) => {
      addMarker(marker, marker.id);
    });
  }, [socket, addMarker]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>
      <div ref={mapDiv} className="mapContainer"></div>
    </>
  );
};
