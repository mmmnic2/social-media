import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ message }: { message: any }) => {
  const currentUser = useSelector((state: any) => state.user);
  const isCurrentUserSend = message.userResponse.id === currentUser.id;
  return (
    <div
      className={`flex ${!isCurrentUserSend ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`p-1 ${
          false ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29] text-white`}
      >
        {/* {true && (
          // <Image width={12} height={17} src={message?.image} alt="image send" />
          // <img
          //   className="w-[12rem] h-[17rem] object-cover rounded-md"
          //   src="https://danviet.mediacdn.vn/upload/1-2015/images/2015-01-26/1434357302-ctkbde1_bnhh.jpg"
          //   alt="image send"
          // />
        )} */}
        <p className="py-1">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
