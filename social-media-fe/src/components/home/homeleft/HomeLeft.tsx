"use client";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";
import { useLogout } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { UserProps } from "@/redux/user";

const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    id: "home",
    path: "/",
  },
  {
    title: "Explore",
    icon: <ExploreIcon />,
    id: "explore",
    path: "/reels",
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon />,
    id: "notifications",
    path: "/notification",
  },
  {
    title: "Message",
    icon: <MessageIcon />,
    id: "messages",
    path: "/message",
  },
  {
    title: "Bookmarks",
    icon: <BookmarkIcon />,
    id: "bookmarks",
    path: "/saved-post",
  },
  {
    title: "Theme",
    icon: <DarkModeIcon />,
    id: "theme",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    id: "settings",
    path: "/setting",
  },
  {
    title: "Logout",
    icon: <LogoutOutlinedIcon />,
    id: "logout",
  },
];

const HomeLeft = ({ isLogin }: { isLogin: boolean }) => {
  const { mutate: logoutAction } = useLogout();
  const userSelector = useSelector((state: UserProps) => state.user);
  console.log(userSelector);
  const handleLogout = () => {
    logoutAction();
  };

  return (
    <div className="sticky top-0 h-max basis-1/4">
      <Link
        href={`/profile/${userSelector?.id}` || "#"}
        className="flex items-center p-4 bg-white rounded-md mt-4"
      >
        <AvatarWithInfo
          imgUrl={"abc"}
          alt={userSelector?.first_name || "Lan Lan"}
          title={
            userSelector?.first_name
              ? userSelector?.first_name + " " + userSelector?.last_name
              : "Lan Lan"
          }
          subtitle={
            userSelector?.first_name
              ? `@${userSelector?.first_name?.toLowerCase()}`
              : "@lanlan"
          }
        />
      </Link>

      <div className="mt-4 bg-white rounded-md">
        {navigationMenu.map((item) => (
          <React.Fragment key={item.id}>
            {item.id === "logout" && <Divider sx={{ color: "gray" }} />}

            {item.id === "logout" ? (
              <div
                className="flex items-center h-16 px-4 cursor-pointer transition-all duration-200 relative"
                onClick={handleLogout}
              >
                <span className="relative text-gray-500 text-xl">
                  {item.icon}
                </span>
                <h3 className="ml-4 text-base">{item.title}</h3>
              </div>
            ) : (
              <Link
                href={isLogin ? item.path || "#" : "/login"}
                className={`flex items-center h-16 px-4 cursor-pointer transition-all duration-200 relative ${
                  item.id === "home"
                    ? "bg-active-side-bar text-text-primary"
                    : ""
                }`}
              >
                <span className="relative text-gray-500 text-xl">
                  {item.icon}
                  {item.id === "notifications" && (
                    <small className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-500 text-white text-xs rounded-full px-1">
                      9+
                    </small>
                  )}
                  {item.id === "messages" && (
                    <small className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-500 text-white text-xs rounded-full px-1">
                      6
                    </small>
                  )}
                </span>
                <h3 className="ml-4 text-base">{item.title}</h3>
                {item.id === "home" && (
                  <span className="absolute left-0 h-full w-1 bg-primary rounded-l-lg"></span>
                )}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HomeLeft;
