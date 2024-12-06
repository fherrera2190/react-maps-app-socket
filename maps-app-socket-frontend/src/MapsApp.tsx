import { SocketProvider } from "./context";
import { MapPages } from "./pages/MapPages";

export const MapsApp = () => {
  return (
    <>
      <SocketProvider>
        <MapPages />
      </SocketProvider>
    </>
  );
};
