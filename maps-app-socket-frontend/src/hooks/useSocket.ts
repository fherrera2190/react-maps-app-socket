import { useEffect, useMemo, useState } from "react";
import { connect } from "socket.io-client";

export const useSocket = (server: string) => {
  const socket = useMemo(() => connect(server), [server]);

  const [onLine, setOnLine] = useState(false);

  useEffect(() => {
    setOnLine(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnLine(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnLine(false);
    });
  }, [socket]);

  return { socket, onLine };
};
