import React, { useEffect } from "react";
import { useSocketContext } from "./socketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext(); // Destructure socket from context
  const { setMessage } = useConversation();

  useEffect(() => {
    // Check if socket is defined
    if (!socket) {
      console.warn("Socket is not defined");
      return; // Exit if socket is not defined
    }

    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    };

    // Listen for new messages
    socket.on("newMessage", handleNewMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessage]); // Dependencies array
};

export default useGetSocketMessage;