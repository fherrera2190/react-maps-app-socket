import { useSocket } from "../hooks/useSocket";
import SocketContext from "./SocketContex";

interface Props {
  children: JSX.Element;
}

export const SocketProvider = ({ children }: Props) => {
  const { socket, onLine } = useSocket(import.meta.env.VITE_SERVER_URL);
  return (
    <SocketContext.Provider value={{ socket, onLine }}>
      {children}
    </SocketContext.Provider>
  );
};
