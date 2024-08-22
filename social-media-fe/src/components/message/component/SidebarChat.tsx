"use client";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";
import SearchUser from "@/components/searchUser/SearchUser";
import { useLogout } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { setChatSelected } from "@/redux/chat/chat";
import { allChatsSelector, chatSelectedSelector } from "@/redux/chat/selectors";
import UserChatCard from "./UserChatCard";

const SidebarChat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentChat = useSelector(chatSelectedSelector);

  const { mutate: logoutAction } = useLogout();

  const allChats = useSelector(allChatsSelector);
  const dispatch = useDispatch();
  const handleSelectUserChat = (chat: any) => {
    dispatch(setChatSelected(chat));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("logout");
    logoutAction();
  };

  return (
    <div className="flex h-full justify-between space-x-2 shadow-custom-shadow">
      <div className="w-full">
        <div className="flex space-x-4 items-center py-5 pl-5 border-b border-gray-300">
          <HomeIcon />
          <h1 className="text-xl font-bold">Home</h1>
        </div>

        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100% - 69px)" }}
        >
          <div className="px-2">
            <SearchUser />
          </div>
          <div className="flex-1 space-y-4 mt-5 overflow-y-scroll hideScrollbar">
            {allChats?.map((chat: any) => (
              <UserChatCard
                key={chat}
                chat={chat}
                handleSelectUserChat={handleSelectUserChat}
                isSelected={chat.chatId === currentChat.chatId}
              />
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-gray-300 py-2 pl-5">
            <AvatarWithInfo
              imgUrl="Lan"
              alt="Lan Lan"
              title="Lan Lan"
              subtitle="status"
            />
            {/* User Action */}
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarChat;
