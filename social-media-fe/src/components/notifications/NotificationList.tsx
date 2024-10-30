"use client";
import React from "react";
import { useSelector } from "react-redux";
import { NotiInfo } from "@/redux/notifications/state";
import NotificationCard from "./NotificationCard";

const NotificationList = () => {
  const allNoti = useSelector((state: any) => state.noti.allNotifications);
  return (
    <div>
      {allNoti.map((noti: NotiInfo) => (
        <NotificationCard key={noti.notificationId} notiInfo={noti} />
      ))}
    </div>
  );
};

export default NotificationList;
