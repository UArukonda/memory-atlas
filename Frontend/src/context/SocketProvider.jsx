import { SocketContext } from "./SocketContext";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.relationship) {
      const newSocket = io("http://localhost:4000", { withCredentials: true });
      newSocket.on("connect_error", (err) => {
        console.log("[socket]", err.message);
      });
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [user?.id, !!user?.relationship]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
