"use client";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SendSharpIcon from "@mui/icons-material/SendSharp";
const UserChatCard = ({
  chat,
  handleSelectUserChat,
}: {
  chat: any;
  handleSelectUserChat: (chat: any) => void;
}) => {
  const dispatch = useDispatch();
  const [userChat, setUserChat] = useState({});
  const userLogin = useSelector((state: any) => state.user);
  useEffect(() => {
    if (chat?.memberList?.length === 1) {
      let parseUserLogin: any = {
        id: userLogin.id,
        firstName: userLogin.first_name,
        lastName: userLogin.last_name,
        email: userLogin.email,
      };
      setUserChat(parseUserLogin);
    } else {
      setUserChat(
        chat?.memberList?.find((member: any) => member.id !== userLogin.id)
      );
    }
  }, [chat, userLogin]);

  return (
    <Card onClick={() => handleSelectUserChat(chat)}>
      <CardHeader
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
            }}
          />
        }
        title={userChat?.firstName + " " + userChat?.lastName}
        subheader={"new message"}
      />
    </Card>
  );
};

export default UserChatCard;
