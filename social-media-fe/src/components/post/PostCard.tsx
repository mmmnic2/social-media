"use client";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";
import SmsIcon from "@mui/icons-material/Sms";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCommentByPostId } from "@/hooks/api-hooks/comment-hooks/useComment";
import {
  useDeletePost,
  useLikePost,
  useSavePost,
} from "@/hooks/api-hooks/post-hooks/usePost";
import { setIsRefetchAllComment } from "@/redux/comment/comment";
import { setIsFetchAllPosts } from "@/redux/post/post";
import {
  refetchAllPostSelector,
  refetchPostByUserSelector,
} from "@/redux/post/selectors";
import { UserProps } from "@/redux/user";
import { parseTime } from "@/utils/utils";
import Image1 from "../../../public/image/cat_bg.jpg";
import CommentList from "../comment/CommentList";
import CreateCommentCard from "../comment/CreateCommentCard";
import SocialAvatar from "../common/avatar/SocialAvatar";
import { useSnackbar } from "../common/snackbar/Snackbar";
import CreatePostModal from "./CreatePostModal";
import DeletePostModal from "./DeletePostModal";

interface PostCardProps {
  post: any;
  isLogin: boolean;
}

const PostCard = ({ post, isLogin }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post?.currentUserLikePost);
  const [showComments, setShowComments] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isEditPostMenuOpen, setIsEditPostMenuOpen] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [isDeletePost, setIsDeletePost] = useState(false);

  const { mutate: handleLikePost } = useLikePost();
  const { mutate: handleSavePost } = useSavePost();
  const { mutate: deletePostMutate } = useDeletePost();
  const {
    data: commentsByPostId,
    isLoading,
    refetch: refetchAllComments,
  } = useGetCommentByPostId(post?.id, showComments);

  const refetchAllPost = useSelector(refetchAllPostSelector);
  const refetchAllPostByUser = useSelector(refetchPostByUserSelector);
  const isRefetchAllComments = useSelector((state: any) => state.comment);
  const currentUser = useSelector((state: UserProps) => state.user);
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

  const handleCloseEditPost = () => {
    setIsEditPost(!isEditPost);
  };

  const handleCloseDeletePost = () => {
    setIsDeletePost(!isDeletePost);
  };

  const handleDeletePost = () => {
    deletePostMutate(post?.id, {
      onSuccess: (data) => {
        showSnackbar(data, "success");
        handleCloseDeletePost();
        dispatch(setIsFetchAllPosts(true));
      },
      onError: (err: any) => {
        showSnackbar(err?.response?.data, "error");
        handleCloseDeletePost();
      },
    });
  };

  useEffect(() => {
    if (isRefetchAllComments) {
      refetchAllComments();
    }
    dispatch(setIsRefetchAllComment(false));
  }, [isRefetchAllComments]);

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
          src={Image1}
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
          {/* Edit Post */}
          {currentUser.id === post?.userResponse?.id && (
            <div className="relative">
              <Tooltip title={"Edit Post"}>
                <button
                  onClick={() => setIsEditPostMenuOpen(!isEditPostMenuOpen)}
                >
                  <MoreHorizIcon />
                </button>
              </Tooltip>
              {isEditPostMenuOpen && (
                <div className="absolute top-5 right-0 bg-light min-w-36 shadow-xl rounded-lg">
                  <p
                    className="hover:bg-accent-color hover:text-white hover:rounded-lg cursor-pointer py-2 px-4"
                    onClick={() => setIsEditPost(!isEditPost)}
                  >
                    Edit Post
                  </p>
                  <p
                    className="hover:bg-accent-color hover:text-white hover:rounded-lg cursor-pointer py-2 px-4"
                    onClick={() => setIsDeletePost(!isDeletePost)}
                  >
                    Delete Post
                  </p>
                </div>
              )}
            </div>
          )}
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
      {/* Comment */}
      {(showComments && (
        <>
          <div className="w-full h-[1px] bg-text-primary"></div>
          <CreateCommentCard post={post} />
          <div className="max-h-48 overflow-y-scroll">
            {(!isLoading && commentsByPostId && (
              <CommentList comments={commentsByPostId} />
            )) || <div>loading...</div>}
          </div>
        </>
      )) ||
        null}
      {isDeletePost && (
        <DeletePostModal
          isOpen={isDeletePost}
          handleClose={handleCloseDeletePost}
          handleApply={handleDeletePost}
        />
      )}
      {isEditPost && (
        <CreatePostModal
          open={isEditPost}
          handleClose={handleCloseEditPost}
          postData={post}
        />
      )}
    </div>
  );
};

export default PostCard;
