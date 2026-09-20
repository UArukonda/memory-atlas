import { SocketContext } from "./SocketContext";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { getUnreadCount } from "../services/message";
import { useAuth } from "./useAuth";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?.relationship) {
      const newSocket = io(
        import.meta.env.VITE_SOCKET_URL ?? "http://localhost:4000",
        { withCredentials: true },
      );
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

  useEffect(() => {
    if (!user?.relationship) {
      setUnreadCount(0);
      return;
    }
    getUnreadCount()
      .then((response) => setUnreadCount(response.data.count))
      .catch((err) => console.log(err?.response?.data?.message));
  }, [user?.id, !!user?.relationship]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (message.sender !== user?.id && pathname !== "/chat") {
        setUnreadCount((prev) => prev + 1);
      }
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket, pathname, user?.id]);

  return (
    <SocketContext.Provider value={{ socket, unreadCount, setUnreadCount }}>
      {children}
    </SocketContext.Provider>
  );
};
