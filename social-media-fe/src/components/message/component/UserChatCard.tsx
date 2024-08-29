"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SocialAvatar from "@/components/common/avatar/SocialAvatar";
import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";

interface UserLoginProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const UserChatCard = ({
  chat,
  handleSelectUserChat,
  isSelected,
}: {
  chat: any;
  handleSelectUserChat: (chat: any) => void;
  isSelected: boolean;
}) => {
  const dispatch = useDispatch();
  const [userChat, setUserChat] = useState<UserLoginProps>();
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
        chat?.memberList?.find((member: any) => member.id !== userLogin.id),
      );
    }
  }, [chat, userLogin]);

  return (
    // <Card onClick={() => handleSelectUserChat(chat)}>
    //   <CardHeader
    //     action={
    //       <IconButton>
    //         <MoreHorizIcon />
    //       </IconButton>
    //     }
    //     avatar={
    //       <Avatar
    //         sx={{
    //           width: "3.5rem",
    //           height: "3.5rem",
    //           fontSize: "1.5rem",
    //         }}
    //       />
    //     }
    //     title={userChat?.firstName + " " + userChat?.lastName}
    //     subheader={"new message"}
    //   />
    // </Card>
    <div
      className={`${isSelected && "bg-[--color-background] border-r-2 border-[--color-primary]"} py-2 pl-5 cursor-pointer`}
      onClick={() => {
        handleSelectUserChat(chat);
      }}
    >
      <AvatarWithInfo
        imgUrl="abc"
        alt="Lan Lan"
        title={userChat?.firstName + " " + userChat?.lastName}
        subtitle={"new message"}
      />
    </div>
  );
};

export default UserChatCard;
