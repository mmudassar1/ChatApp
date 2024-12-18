import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import profile from "../../../public/user.png";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext(); // Ensure this is correct
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profile} alt="User  Profile" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.username}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;