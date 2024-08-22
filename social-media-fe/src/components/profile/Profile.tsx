"use client";
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPostByUserId } from "@/hooks/api-hooks/post-hooks/usePost";
import {
  useGetUserById,
  useGetUserProfile,
} from "@/hooks/api-hooks/user-hooks/useUser";
import { setRefetchPostByUser } from "@/redux/post/post";
import PostCard from "../post/PostCard";
import UserReelCard from "../reels/UserReelCard";
import UpdateProfileModal from "./component/UpdateProfileModal";
const properties = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];
const posts = [1, 1, 1, 1, 1];

const Profile = ({ id }: { id: string | number }) => {
  const [value, setValue] = useState("post");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  // hàm getUserInforByUserId
  const {
    data: userInfor,
    error,
    isLoading,
    isSuccess,
    refetch,
  }: {
    data: any;
    error: any;
    isLoading: boolean;
    isSuccess: boolean;
    refetch: () => void;
  } = useGetUserById(id);
  // hàm getPostByUserId
  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
    isSuccess: getPostSuccess,
    refetch: refetchGetPostByUserId,
  }: {
    data: any;
    error: any;
    isLoading: boolean;
    isSuccess: boolean;
    refetch: () => void;
  } = useGetPostByUserId(id);
  useEffect(() => {
    dispatch(setRefetchPostByUser(refetchGetPostByUserId));
  }, [refetchGetPostByUserId, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card className="py-10 w-[70%] ">
      <div className="rounded-md">
        <div className="h-[20rem]">
          <img
            className="w-full h-full rounded-lg"
            src="https://www.catster.com/wp-content/uploads/2023/11/a-silver-tabby-cat-on-gray-background_Oleksandr-Volchanskyi_Shuttersock-800x533.jpg"
            alt="cat"
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            className="transform -translate-y-24"
            src="https://images.pexels.com/photos/6743871/pexels-photo-6743871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          {true ? (
            <Button
              onClick={handleOpen}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
            >
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined">Follow</Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {userInfor?.firstName} {userInfor?.lastName}
            </h1>
            <p>{userInfor?.email}</p>
          </div>

          <div className="flex gap-5 items-center py-3">
            <span>41 post</span>
            <span>{userInfor?.followerList?.length} followers</span>
            <span>{userInfor?.followingList?.length} followings</span>
          </div>
          <div>
            <p>Write something here ok ok ok ok ok ok ok ok?</p>
          </div>
        </div>

        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {properties.map((prop) => (
                <Tab
                  key={prop.value}
                  value={prop.value}
                  label={prop.name}
                  wrapped
                />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[75%] my-10">
                {postData?.map((post: any) => (
                  <div
                    key={post}
                    className="border border-slate-100 rounded-md"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="py-5 flex flex-wrap gap-2 justify-center">
                {posts.map((post) => (
                  <UserReelCard key={post} />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[75%] my-10">
                {posts.map((post) => (
                  <div
                    key={post}
                    className="border border-slate-100 rounded-md"
                  >
                    {/* <PostCard /> */}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
      <section>
        <UpdateProfileModal
          open={open}
          handleClose={handleClose}
          refetchUserProfile={refetch}
        />
      </section>
    </Card>
  );
};

export default Profile;
