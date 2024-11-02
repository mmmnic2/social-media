"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NotiInfo } from "@/redux/notifications/state";
import NotificationCard from "./NotificationCard";

const NotificationList = () => {
  const { allNotifications } = useSelector((state: any) => state.noti);
  const [allNoti, setAllNoti] = useState([]);
  const compare = JSON.stringify(allNoti) === JSON.stringify(allNotifications);
  useEffect(() => {
    setAllNoti(allNotifications);
  }, [compare]);
  return (
    <div className="overflow-y-scroll max-h-52">
      {(allNoti.length > 0 &&
        allNoti.map((noti: NotiInfo) => (
          <NotificationCard key={noti.notificationId} notiInfo={noti} />
        ))) || <div>No notification</div>}
    </div>
  );
};

export default NotificationList;
