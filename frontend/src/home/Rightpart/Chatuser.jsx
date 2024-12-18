import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

import profile from "../../../public/user.png"; // getting photo from public folder.

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext(); // Correctly destructuring onlineUsers

  // Ensure onlineUsers is an array
  const getOnlineUsersStatus = (userId) => {
    if (!Array.isArray(onlineUsers)) {
      console.warn("onlineUsers is not an array:", onlineUsers);
      return "Offline"; // Default to Offline if onlineUsers is not an array
    }
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
        <div className={`avatar ${selectedConversation ? "online" : ""}`}>
          <div className="w-16 rounded-full">
            <img src={profile} alt="User  Profile" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{selectedConversation?.username}</h1>
          <span className="text-sm">
            {selectedConversation ? getOnlineUsersStatus(selectedConversation._id) : "Select a user"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;