"use client";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Card,
  CardHeader,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useCreateChat } from "@/hooks/api-hooks/chat-hooks/useChat";
import { useSearchUser } from "@/hooks/api-hooks/user-hooks/useUser";
import { useAppStores } from "@/lib/context/AppStoreContext";
import { User } from "@/types/userTypes";
const SearchUser = () => {
  const [username, setUsername] = useState("");
  const { mutate: searchUser } = useSearchUser();
  const [userSearchList, setUserSearchList] = useState([]);
  const { chatStore } = useAppStores();
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const { mutate: createChat } = useCreateChat();
  const handleSearchUser = (e: any) => {
    setUsername(e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (e.target.value.trim() !== "") {
          searchUser(username, {
            onSuccess: (data) => {
              setUserSearchList(data);
            },
          });
        }
      }, 1500),
    );
  };
  const handleClick = (id: number | null) => {
    if (!id) return;
    const payload = { userId: id };
    createChat(payload, {
      onSuccess: (data) => {
        chatStore.getState().setSelectedChat(data);
      },
      onError: (error) => {
        console.error(error);
      },
      onSettled: () => {
        setUserSearchList([]);
      },
    });
  };

  return (
    <div>
      <div className="relative py-2">
        <TextField
          onChange={handleSearchUser}
          value={username}
          variant="outlined"
          placeholder="Find your friend"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: "25px", // Tùy chỉnh border radius ở đây
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px", // Áp dụng border radius cho input bên trong
            },
            "& .MuiOutlinedInput-root input": {
              padding: "10px 14px",
            },
          }}
        />

        {username && (
          <div className="flex absolute w-full z-10 flex-col space-y-2 bg-white">
            {userSearchList?.map((user: User) => (
              <Card
                key={user.id}
                className=" cursor-pointer"
                onClick={() => {
                  handleClick(user.id);
                  setUsername("");
                }}
              >
                <CardHeader
                  avatar={<Avatar />}
                  title={user?.firstName + " " + user?.lastName}
                  subheader={user.email}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
