import { createContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket;
  onLine: boolean;
}

const SocketContext = createContext({} as SocketContextType);

export default SocketContext;
