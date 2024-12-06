import { useContext, useEffect } from "react";
import SocketContext from "../context/SocketContex";
import { MarkerResponse } from "../interfaces";
import { useMapbox } from "../hooks";


const puntoInicial = {
  lng: -65.28,
  lat: -24.21,
  zoom: 13.5,
};

export const useSocketMapBox = () => {
  const { mapDiv, coords, newMarker$, movMarker$, addMarker, updateMarker } =
    useMapbox(puntoInicial);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("active-markers", (markers) => {
      for (const key of Object.keys(markers)) {
        console.log(markers[key]);
        addMarker(markers[key], key);
      }
    });
  }, [socket, addMarker]);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit("new-marker", marker);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    movMarker$.subscribe((mark) => {
      console.log("MapaPage", mark);

      socket.emit("update-marker", mark);
    });
  }, [movMarker$]);

  useEffect(() => {
    socket.on("update-marker", (marker: MarkerResponse) => {
      console.log(marker);
      updateMarker(marker);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("new-marker", (marker: MarkerResponse) => {
      addMarker(marker, marker.id);
    });
  }, [socket, addMarker]);

  return {
    mapDiv,
    coords,
  };
};
