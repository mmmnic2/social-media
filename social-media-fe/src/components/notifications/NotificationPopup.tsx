import React from "react";

const notifications = [
  {
    username: "Ngan Ngan",
    avatar: "./image/image1.png",
    create_day: "ok",
    content: "accept your friend request",
  },
  {
    username: "Ngan Ngan",
    avatar: "./image/image1.png",
    create_day: "ok",
    content: "accept your friend request",
  },
  {
    username: "Ngan Ngan",
    avatar: "./image/image1.png",
    create_day: "ok",
    content: "accept your friend request",
  },
];
const NotificationPopup = () => {
  return (
    <div className="notifications-popup">
      {notifications.map((item, i) => (
        <div key={i}>
          <div className="profile-photo">
            <img src="./image/image1.png" />
          </div>
          <div className="notifications-body">
            <b>{item.username}</b>
            {item.content}
            <small className="text-muted">{item.create_day}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPopup;
