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
import { useDispatch, useSelector } from "react-redux";
import { useLikePost, useSavePost } from "@/hooks/api-hooks/post-hooks/usePost";
import { setIsFetchAllPosts } from "@/redux/post/post";
import {
  refetchAllPostSelector,
  refetchPostByUserSelector,
} from "@/redux/post/selectors";
import { parseTime } from "@/utils/utils";
import SocialAvatar from "../common/avatar/SocialAvatar";
import { useSnackbar } from "../common/snackbar/Snackbar";

interface PostCardProps {
  post: any;
  isLogin: boolean;
}

const PostCard = ({ post, isLogin }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post?.currentUserLikePost);
  const [showComments, setShowComments] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);

  const { mutate: handleLikePost } = useLikePost();
  const { mutate: handleSavePost } = useSavePost();

  const refetchAllPost = useSelector(refetchAllPostSelector);
  const refetchAllPostByUser = useSelector(refetchPostByUserSelector);
  const dispatch = useDispatch();

  const { showSnackbar } = useSnackbar();

  const handleClickLikePost = () => {
    handleLikePost(post.id, {
      onSuccess: (data) => {
        setIsLiked(!data.delete);
        dispatch(setIsFetchAllPosts(true));
        refetchAllPost();
        refetchAllPostByUser();
      },
    });
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleBookMark = () => {
    handleSavePost(post?.id, {
      onSuccess: (data) => {
        showSnackbar(data, "success");
        setIsBookMarked(!isBookMarked);
      },
      onError: (err: any) => {
        showSnackbar(err, "error");
      },
    });
  };

  const renderPostCardImage = () => {
    if (post?.image && isLogin) {
      return (
        <Image
          width={1000}
          height={90}
          src={post?.image}
          alt={`${post?.caption || "Post"} Image`}
        />
      );
    } else if (!isLogin) {
      return (
        <Image
          width={1000}
          height={90}
          src={"/image/image1.png"}
          alt={`${post?.caption || "Post"} Image`}
        />
      );
    }
    return null;
  };

  return (
    <div className="feed bg-white rounded-xl py-2 px-4 mb-4">
      {/* ======== POST CARD HEADER========== */}
      <div className="head">
        <div className="user flex items-center justify-between">
          <div className="ingo flex items-center gap-2">
            <SocialAvatar
              imgUrl="abc"
              alt={post?.userResponse?.firstName || "Lan Lan"}
            />
            <div>
              <h3 className="font-bold text-[1.2rem]">
                {post?.userResponse?.firstName || "Lan Lan"}
              </h3>
              <small className="text-xs">
                {post?.modifiedDate && isLogin
                  ? parseTime(post?.modifiedDate)
                  : "15 MINUTES AGO"}
              </small>
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
          <p>{post?.caption || "Great food!"}</p>
        </div>
        <div className="photo">{renderPostCardImage()}</div>
      </div>
      {/* ======== POST CARD FOOTER========== */}
      <div className="foot">
        <div className="liked-by flex gap-4">
          <div className="comments text-muted">
            {post?.totalLikes || 0} Likes
          </div>
          <div className="comments text-muted">
            {post?.totalComments || 0} Comments
          </div>
        </div>
        <div className="action-button flex justify-between">
          <div className="interaction-buttons">
            <IconButton disabled={!isLogin} onClick={handleClickLikePost}>
              {isLiked ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            <IconButton disabled={!isLogin} onClick={handleShowComments}>
              <SmsIcon />
            </IconButton>

            <IconButton disabled={!isLogin}>
              <ShareIcon />
            </IconButton>
          </div>
          <div className="book-mark">
            <IconButton disabled={!isLogin} onClick={handleBookMark}>
              {isBookMarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
