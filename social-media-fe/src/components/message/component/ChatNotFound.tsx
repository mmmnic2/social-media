import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
const ChatNotFound = () => {
  return (
    <div className="h-full space-y-5 flex flex-col justify-center items-center">
      <ChatBubbleOutlineIcon sx={{ fontSize: "10rem", opacity: "0.5" }} />
      <p className="text-xl font-semibold opacity-60">No Chat Selected</p>
    </div>
  );
};

export default ChatNotFound;
