"use client";
import { Client, Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { useSnackbar } from "../common/snackbar/Snackbar";

export const StomClientProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: Object | undefined;
}) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const userSelector = useSelector((state: any) => state.user);
  const { showSnackbar } = useSnackbar();

  const onError = (error: any) => {
    console.error("error: ", error);
  };

  const onNotiFriendStatus = (friendStatus: any) => {
    const friendInfo = JSON.parse(friendStatus.body);
    showSnackbar(
      `${friendInfo.lastName + " " + friendInfo.firstName} has ${friendInfo.userStatus}`,
    );
  };

  useEffect(() => {
    if (token) {
      const sock = new SockJS("http://localhost:8080/ws");
      const stomp = Stomp.over(sock);
      setStompClient(stomp);
      stomp.connect(
        {},
        () => {
          console.log("websocket connected...");
          stomp.subscribe("/user/queue/messages", () => {});
          if (userSelector.id) {
            stomp.subscribe(
              `/topic/friend-status/${userSelector.id}`,
              onNotiFriendStatus,
            );
          }
        },
        onError,
      );
      return () => {
        if (stomp) {
          stomp.disconnect();
        }
      };
    }
  }, [token]);

  return <div>{children}</div>;
};
