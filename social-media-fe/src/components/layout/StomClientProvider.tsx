"use client";
import { Client, Stomp } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { useGetNotification } from "@/hooks/api-hooks/notification-hooks/useNotification";
import { useAppStores } from "@/lib/context/AppStoreContext";
import { useSnackbar } from "../common/snackbar/Snackbar";

export const StomClientProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const { userStore } = useAppStores();
  const userInfo = userStore?.getState().user;
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { refetch: refetchGetNotification } = useGetNotification(
    userInfo?.id || 0,
    token || "",
  );
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
    const notificationInfo = JSON.parse(noti.body);
    refetchGetNotification();
    switch (notificationInfo?.type) {
      case "FRIEND_REQUEST":
        showSnackbar(notificationInfo?.message, "info");
        queryClient.invalidateQueries({
          queryKey: ["pending-requests"],
        });
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
          if (userInfo?.id) {
            stomp.subscribe(
              `/topic/friend-status/${userInfo?.id}`,
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
