"use client";
import {
  Avatar,
  Card,
  CardHeader,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchUser } from "@/hooks/api-hooks/user-hooks/useUser";
import { useCreateChat } from "@/hooks/api-hooks/chat-hooks/useChat";
import { setChatSelected } from "@/redux/chat/chat";
const SearchUser = () => {
  const [username, setUsername] = useState("");
  const { mutate: searchUser, isLoading } = useSearchUser();
  const [userSearchList, setUserSearchList] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const dispatch = useDispatch();
  const { mutate: createChat } = useCreateChat();
  const handleSearchUser = (e: any) => {
    console.log("search user:", e.target.value);
    setUsername(e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (e.target.value.trim() !== "") {
          searchUser(username, {
            onSuccess: (data) => {
              console.log(data);
              setUserSearchList(data);
            },
          });
        }
      }, 1500)
    );
  };
  const handleClick = (id: number) => {
    console.log(id);
    const payload = { userId: id };
    createChat(payload, {
      onSuccess: (data) => {
        dispatch(setChatSelected(data));
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
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
          placeholder="Search..."
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
            {userSearchList?.map((user: any) => (
              <Card
                key={user}
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
