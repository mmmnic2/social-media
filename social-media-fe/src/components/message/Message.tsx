"use client";
import { Avatar, Grid, IconButton } from "@mui/material";
import { Stomp, Client, StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { useGetChatsByUser } from "@/hooks/api-hooks/chat-hooks/useChat";
import ChatNotFound from "./component/ChatNotFound";
import ChatPanel from "./component/ChatPanel";
import SidebarChat from "./component/SidebarChat";
import { setAllChats, setChatSelected } from "@/redux/chat/chat";
import { chatSelectedSelector } from "@/redux/chat/selectors";
import { addMessage } from "@/redux/message/message";
const Message = () => {
  const { data: allChats, isLoading } = useGetChatsByUser();
  const currentChat = useSelector(chatSelectedSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllChats(allChats));
  }, [allChats, dispatch]);
  const validToken = useSelector((state: any) => state.auth.accessToken);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [subscription, setSubscription] = useState<StompSubscription | null>(
    null,
  );
  //websocket ở đây
  const userLogin = useSelector((state: any) => state.user);
  const onConnect = (frame: any) => {
    console.log("websocket connected...", frame);
  };
  const onMessageReceive = useCallback((message: any) => {
    const receivedMessage = JSON.parse(message.body);
    dispatch(addMessage(receivedMessage));
  }, []);
  useEffect(() => {
    if (stompClient && Object.keys(currentChat).length > 0) {
      const newSubscription = stompClient.subscribe(
        `/topic/messages/${currentChat.chatId}`,
        onMessageReceive,
      );
      setSubscription(newSubscription);
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [currentChat, stompClient, onMessageReceive]);

  const onError = (error: any) => {
    console.error("error: ", error);
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
    const sock = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);
    return () => {
      dispatch(setChatSelected({}));
      if (stomp) {
        stomp.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid item xs={3} className="px-5">
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

export default Message;
