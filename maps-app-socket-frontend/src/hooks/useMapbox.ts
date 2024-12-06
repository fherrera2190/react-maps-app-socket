import mapboxgl, { Map, MapMouseEvent } from "mapbox-gl";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { v4 } from "uuid";
import { MarkerResponse, Marks } from "../interfaces";
import { Subject } from "rxjs";

interface UseMapboxArgs {
  lng: number;
  lat: number;
  zoom: number;
}

export const useMapbox = (puntoInicial: UseMapboxArgs) => {
  // Div map ref
  const mapDiv = useRef<HTMLDivElement>(null);
  // const [map, setMap] = useState<Map>();
  const map = useRef<Map>();

  const [coords, setCoords] = useState(puntoInicial);
  //Mark refs
  const markers = useRef<Marks>({});

  //Observables de rxjs
  const movMarker = useRef(new Subject());

  const newMarker = useRef(new Subject());

  //Add markers
  const addMarker = useCallback((e: MapMouseEvent, id?: string) => {
    const { lng, lat } = e.lngLat || e;
    const marker = new mapboxgl.Marker();
    const idBack = id ?? v4();
    marker.setLngLat([lng, lat]).addTo(map.current!).setDraggable(true);

    markers.current[idBack] = marker;

    if (!id) {
      newMarker.current.next({
        id: idBack,
        lng,
        lat,
      });
    }

    //movimientos del marker
    marker.on("drag", (e) => {
      const { lng, lat } = e.target.getLngLat();
      movMarker.current.next({
        id: idBack,
        lng,
        lat,
      });
    });
  }, []);

  const updateMarker = useCallback(({ id, lng, lat }: MarkerResponse) => {
    markers.current[id].setLngLat([lng, lat]);
  }, []);

  useLayoutEffect(() => {
    if (mapDiv.current) {
      const mapCreate = new mapboxgl.Map({
        container: mapDiv.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [coords.lng, coords.lat],
        zoom: coords.zoom,
      });
      map.current = mapCreate;
    }
  }, [puntoInicial]);

  useEffect(() => {
    if (map && map.current) {
      map.current.on("move", () => {
        const { lng, lat } = map.current!.getCenter();
        const zoom = +map.current!.getZoom().toFixed(2);

        setCoords({
          zoom,
          lng: +lng.toFixed(4),
          lat: +lat.toFixed(4),
        });
      });
    }

    // Si la pantalla cambiara o se eliminara, se desuscribira de los eventos
    // return () => {
    //   map?.off("move", () => {});
    // };
  }, []);

  useEffect(() => {
    map?.current?.on("click", addMarker);
  }, [addMarker]);

  return {
    coords,
    mapDiv,
    markers,
    movMarker$: movMarker.current,
    newMarker$: newMarker.current,

    addMarker,
    updateMarker,
  };
};
