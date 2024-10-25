"use client";
import { Client, Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  const onError = (error: any) => {
    console.error("error: ", error);
  };

  const onNotiFriendStatus = (friendStatus: any) => {
    const friendInfo = JSON.parse(friendStatus.body);
    showSnackbar(
      `${friendInfo.lastName + " " + friendInfo.firstName} has ${friendInfo.userStatus}`,
    );
  };

  const onNotification = (noti: any) => {
    console.log(noti);
    const notificationInfo = JSON.parse(noti.body);
    console.log(notificationInfo);
    switch (notificationInfo?.type) {
      case "FRIEND_REQUEST":
        showSnackbar(notificationInfo?.message, "info");
        queryClient.invalidateQueries("pending-requests");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (token) {
      const sock = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
      const stomp = Stomp.over(sock);
      setStompClient(stomp);
      stomp.connect(
        {},
        () => {
          console.log("websocket connected...");
          stomp.subscribe("/user/queue/messages", () => {});
          stomp.subscribe("/user/queue/notifications", onNotification);
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
