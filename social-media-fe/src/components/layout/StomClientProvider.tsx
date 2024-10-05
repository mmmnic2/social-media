"use client";
import { Client, Stomp } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";

export const StomClientProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: Object | undefined;
}) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const userSelector = useSelector((state: any) => state.user);

  const onError = (error: any) => {
    console.error("error: ", error);
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
              () => {},
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
