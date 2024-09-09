"use client";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import SmsIcon from "@mui/icons-material/Sms";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useLikePost } from "@/hooks/api-hooks/post-hooks/usePost";
import {
  refetchAllPostSelector,
  refetchPostByUserSelector,
} from "@/redux/post/selectors";
import SocialAvatar from "../common/avatar/SocialAvatar";

const PostCardV2 = ({ post }: { post: any }) => {
  const [isLiked, setIsLiked] = useState(post?.currentUserLikePost);
  const [showComments, setShowComments] = useState(false);

  const { mutate: handleLikePost, data } = useLikePost();
  const queryClient = useQueryClient();

  const refetchAllPost = useSelector(refetchAllPostSelector);
  const refetchAllPostByUser = useSelector(refetchPostByUserSelector);

  const handleClickLikePost = () => {
    handleLikePost(post.id, {
      onSuccess: (data) => {
        setIsLiked(!data.delete);
        refetchAllPost();
        // queryClient.invalidateQueries(["post", post.id]);
        queryClient.invalidateQueries("all_posts");

        refetchAllPostByUser();
      },
    });
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="feed bg-white rounded-xl py-2 px-4 mb-4">
      {/* ======== POST CARD HEADER========== */}
      <div className="head">
        <div className="user flex items-center justify-between">
          <div className="ingo flex items-center gap-2">
            <SocialAvatar imgUrl="abc" alt="Lan Lan" />
            <div>
              <h3 className="font-bold text-[1.2rem]">Lan Lan</h3>
              <small className="text-xs">15 MINUTES AGO</small>
            </div>
          </div>
          <span className="edit">
            <i className="uil uil-ellipsis-h"></i>
          </span>
        </div>
      </div>
      {/* ======== POST CARD BODY========== */}

      <div className="body">
        <div className="caption mt-3">
          <p>Great Food!</p>
        </div>
        <div className="photo">
          <Image width={1000} height={90} src="/image/image1.png" alt="img" />
        </div>
      </div>
      {/* ======== POST CARD FOOTER========== */}
      <div className="foot">
        <div className="liked-by flex gap-4">
          <div className="comments text-muted">25 Likes</div>
          <div className="comments text-muted">25 Comments</div>
        </div>
        <div className="action-button flex justify-between">
          <div className="interaction-buttons">
            <IconButton onClick={handleClickLikePost}>
              {isLiked ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            <IconButton onClick={handleShowComments}>
              <SmsIcon />
            </IconButton>

            <IconButton>
              <ShareIcon />
            </IconButton>
          </div>
          <div className="book-mark">
            <IconButton>
              {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardV2;
