"use client";
import WestIcon from "@mui/icons-material/West";
import SearchUser from "@/components/searchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import { useDispatch, useSelector } from "react-redux";
import { allChatsSelector } from "@/redux/chat/selectors";
import { setChatSelected } from "@/redux/chat/chat";
const SidebarChat = () => {
  const allChats = useSelector(allChatsSelector);
  const dispatch = useDispatch();
  const handleSelectUserChat = (chat: any) => {
    dispatch(setChatSelected(chat));
  };
  return (
    <div className="flex h-full justify-between space-x-2">
      <div className="w-full">
        <div className="flex space-x-4 items-center py-5">
          <WestIcon />
          <h1 className="text-xl font-bold">Home</h1>
        </div>

        <div className="h-[83vh]">
          <div className="">
            <SearchUser />
          </div>
          <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
            {allChats?.map((chat: any) => (
              <UserChatCard
                key={chat}
                chat={chat}
                handleSelectUserChat={handleSelectUserChat}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarChat;
