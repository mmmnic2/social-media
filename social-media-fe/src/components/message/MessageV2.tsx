"use client";
import { Avatar, Grid, IconButton } from "@mui/material";
import { Stomp, Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { useGetChatsByUser } from "@/hooks/api-hooks/chat-hooks/useChat";
import { setAllChats } from "@/redux/chat/chat";
import { chatSelectedSelector } from "@/redux/chat/selectors";
import { addMessage } from "@/redux/message/message";
import ChatNotFound from "./component/ChatNotFound";
import ChatPanel from "./component/ChatPanel";
import SidebarChat from "./component/SidebarChat";
const MessageV2 = () => {
  const { data: allChats, isLoading } = useGetChatsByUser();
  const currentChat = useSelector(chatSelectedSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllChats(allChats));
  }, [allChats, dispatch]);
  const validToken = useSelector((state: any) => state.auth.accessToken);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  //websocket ở đây
  const userLogin = useSelector((state: any) => state.user);
  const onConnect = (frame: any) => {
    console.log("websocket connected...", frame);
  };
  useEffect(() => {
    if (stompClient && Object.keys(currentChat).length > 0) {
      stompClient.subscribe(
        `/user/${currentChat?.chatId}/private`,
        onMessageReceive,
      );
    }
  }, [currentChat, stompClient]);

  const onError = (error: any) => {
    console.log("error: ", error);
  };

  const onMessageReceive = (message: any) => {
    const receivedMessage = JSON.parse(message.body);
    // console.log("message receive from websocket ", receivedMessage);
    //dispatch thêm new message vào state
    dispatch(addMessage(receivedMessage));
  };

  const sendMessageToServer = (message: any) => {
    if (stompClient?.connected && message) {
      stompClient.publish({
        destination: `/app/chat/${currentChat?.chatId}`,
        body: JSON.stringify(message),
        headers: {
          "content-type": "application/json", // Optional: Xác định kiểu nội dung là JSON
        },
      });
    }
  };
  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);
  }, [validToken]);
  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid item xs={3} className=" bg-[--color-white]">
          <SidebarChat />
        </Grid>
        <Grid className="h-full" item xs={9}>
          {Object.keys(currentChat).length > 0 ? (
            <ChatPanel sendMessageToServer={sendMessageToServer} />
          ) : (
            <ChatNotFound />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MessageV2;
