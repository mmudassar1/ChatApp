import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider"; // Ensure this is the correct path
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser ] = useAuth(); // Ensure this is the correct hook for authentication

  useEffect(() => {
    if (authUser ) {
      // Initialize socket connection
      const socketInstance = io("http://localhost:3001", {
        query: {
          userId: authUser .user._id,
        },
      });
      setSocket(socketInstance);

      // Listen for online users
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup function to close the socket connection
      return () => {
        socketInstance.disconnect(); // Use disconnect instead of close
      };
    } else {
      // If no authUser , close the socket connection
      if (socket) {
        socket.disconnect(); // Use disconnect instead of close
        setSocket(null);
      }
    }
  }, [authUser ]); // Dependency on authUser 

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};