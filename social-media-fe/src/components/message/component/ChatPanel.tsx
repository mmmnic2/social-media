"use client";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CallIcon from "@mui/icons-material/Call";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Avatar, IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import {
  useCreateMessage,
  useGetMessageByChat,
} from "@/hooks/api-hooks/message-hooks/useMessage";
import { useAppStores } from "@/lib/context/AppStoreContext";
import ChatMessage from "./ChatMessage";

interface parseUserLoginProp {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ChatPanel = ({
  sendMessageToServer,
}: {
  sendMessageToServer: Function;
}) => {
  const [userChat, setUserChat] = useState<parseUserLoginProp>();
  const { userStore, chatStore } = useAppStores();
  const currentChat = useStore(chatStore, (state) => state.selectedChat);
  const userLogin = useStore(userStore, (state) => state.user);
  const allMsgs = useStore(chatStore, (state) => state.allMessages);
  const [selectedImage, setSelectedImage] = useState();
  const [imageSrc, setImageSrc] = useState("");
  const [message, setMessage] = useState("");
  const { mutate: handleCreateMessage } = useCreateMessage();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  //gọi api để lấy allmessage by chatId => lưu vào state
  const {
    data: allMessages,
    isLoading,
    isSuccess,
  } = useGetMessageByChat(currentChat?.chatId);
  // const [chatMessages, setChatMessages] = useState([]);
  const handleSelectImage = (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(e.target.files);
    const createImgSrc = URL.createObjectURL(file);
    setImageSrc(createImgSrc);
  };

  //parse user
  useEffect(() => {
    if (currentChat?.memberList?.length === 1) {
      let parseUserLogin: parseUserLoginProp = {
        id: userLogin?.id || 0,
        firstName: userLogin?.firstName || "",
        lastName: userLogin?.lastName || "",
        email: userLogin?.email || "",
      };
      setUserChat(parseUserLogin);
    } else {
      setUserChat(
        currentChat?.memberList?.find(
          (member: any) => member.id !== userLogin?.id,
        ),
      );
    }
  }, [currentChat, userLogin]);

  const handleSendMessage = () => {
    let payload = {
      chatId: currentChat.chatId,
      content: message,
      image: null,
    };
    handleCreateMessage(payload, {
      onSuccess: (data) => {
        // send message to websocket server
        sendMessageToServer(data);
        //
        setMessage("");
        setSelectedImage(undefined);
      },
    });
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allMsgs]);

  useEffect(() => {
    if (isSuccess) {
      chatStore.getState().setAllMessages(allMessages);
    }
  }, [isSuccess]);

  // Tạo kết nối socket-client

  return (
    <>
      <div>
        <div className="flex justify-between items-center border-1 p-5">
          <div className="flex items-center space-x-3">
            <Avatar />
            <p>{userChat?.firstName + " " + userChat?.lastName}</p>
          </div>

          <div className="flex space-x-3">
            <IconButton>
              <CallIcon />
            </IconButton>
            <IconButton>
              <VideocamIcon />
            </IconButton>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-2 py-5"
        >
          {allMsgs?.map((mess: any) => (
            <ChatMessage key={mess} message={mess} />
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 border-1">
        {imageSrc && (
          <div className="w-[6rem] h-[6rem]">
            <Image
              className="w-[6rem] h-[6rem]"
              src="https://danviet.mediacdn.vn/upload/1-2015/images/2015-01-26/1434357302-ctkbde1_bnhh.jpg"
              alt="test"
              width={96}
              height={96}
            />
          </div>
        )}
        <div className="py-5 flex items-center justify-center space-x-5">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
            placeholder="Type message..."
            type="text"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleSelectImage}
              className="hidden"
              id="image-input"
            />
            <label htmlFor="image-input">
              <AddPhotoAlternateIcon />
            </label>
          </div>
          <IconButton onClick={handleSendMessage}>
            <SendSharpIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
