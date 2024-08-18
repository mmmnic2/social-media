"use client";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as React from "react";
import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";

const navigationMenu = [
  {
    tilte: "Home",
    icon: <HomeIcon />,
    classname: "uil uil-home",
    id: "home",
    path: "/",
  },
  {
    tilte: "Explore",
    icon: <ExploreIcon />,
    classname: "uil uil-compass",
    id: "saved_post",
    path: "/reels",
  },
  {
    tilte: "Notifications",
    icon: <ControlPointIcon />,
    classname: "uil uil-bell",
    id: "notifications",
    path: "/notification",
  },
  {
    tilte: "Message",
    icon: <NotificationsIcon />,
    classname: "uil uil-envelope-alt",
    path: "/message",
  },
  {
    tilte: "Bookmarks",
    icon: <MessageIcon />,
    classname: "uil uil-bookmark",
    path: "/saved-post",
  },
  {
    tilte: "Theme",
    icon: <GroupIcon />,
    classname: "uil uil-home",
    // path: "/communities",
  },
  {
    tilte: "Settings",
    icon: <AccountCircleIcon />,
    classname: "uil uil-setting",
    path: "/setting",
  },
];
const HomeLeft = () => {
  return (
    <div className="left">
      <a className="profile">
        <AvatarWithInfo imgUrl="abc" alt="Lan Lan" title="Lan" subtitle="@lanlan"/>
      </a>

      <div className="sidebar">
        {/* {navigationMenu.map((item) => (
          <a key={item.tilte} href="" className="menu-item">
            <span>
              <i className={item.classname}></i>
            </span>
            <h3>{item.tilte}</h3>
          </a>
        ))} */}

        <a href="/" className="menu-item active">
          <span>
            <i className="uil uil-home"></i>
          </span>
          <h3>Home</h3>
        </a>

        <a href="/reels" className="menu-item">
          <span>
            <i className="uil uil-compass"></i>
          </span>
          <h3>Explore</h3>
        </a>

        <a href="" className="menu-item" id="notifications">
          <span>
            <i className="uil uil-bell">
              <small className="notification-count">9+</small>
            </i>
          </span>
          <h3>Notifications</h3>
        </a>

        <a href="" className="menu-item" id="messages-notifications">
          <span>
            <i className="uil uil-envelope-alt">
              <small className="notification-count">6</small>
            </i>
          </span>
          <h3>Messages</h3>
        </a>

        <a href="" className="menu-item">
          <span>
            <i className="uil uil-palette"></i>
          </span>
          <h3>Theme</h3>
        </a>

        <a href="" className="menu-item">
          <span>
            <i className="uil uil-setting"></i>
          </span>
          <h3>Settings</h3>
        </a>
      </div>
    </div>
  );
};

export default HomeLeft;
