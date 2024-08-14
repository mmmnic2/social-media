"use client";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  colors,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import SmsIcon from "@mui/icons-material/Sms";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CreateCommentCard from "../comment/CreateCommentCard";
import CommentCard from "../comment/CommentCard";
import { parseTime } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useLikePost } from "@/hooks/api-hooks/post-hooks/usePost";
import { refetchAllPostSelector } from "@/redux/post/selectors";
import { useQueryClient } from "react-query";
import { useGetCommentByPostId } from "@/hooks/api-hooks/comment-hooks/useComment";
import { refetchPostByUserSelector } from "@/redux/post/selectors";
const PostCard = ({ post }: { post: any }) => {
  const dispatch = useDispatch();
  // const getCommentByPostId = commentSelectedSelector();
  // const comment = useSelector((state) =>
  //   commentSelectedSelector(state, post.id)
  // );

  // const userLikePostList = useSelector((state: any) =>
  //   listUserLikePostSelector(state, post.id)
  // );
  const [isLiked, setIsLiked] = useState(post?.currentUserLikePost);
  const { mutate: handleLikePost, data } = useLikePost();
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const {
    data: commentData,
    isLoading: loadingComment,
    refetch,
  } = useGetCommentByPostId(post?.id, showComments);
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
  // const isUserLiked = (userId: number) => {
  //   let userLike = userLikePostList.find((user: any) => user.id === userId);
  //   return !!userLike;
  // };
  // const user_id = useSelector((state: any) => state.user.id);
  // useEffect(() => {
  //   setIsLiked(isUserLiked(user_id));
  // }, []);

  //use staletime in react-query to handle user spam click

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          post?.userResponse?.firstName + " " + post?.userResponse?.lastName
        }
        subheader={parseTime(post?.createDate)}
        titleTypographyProps={{ fontWeight: "bold" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {post?.caption}
        </Typography>
      </CardContent>
      {post?.image && (
        <CardMedia
          component="img"
          height="194"
          image={post?.image}
          alt="Cute Cat"
        />
      )}
      <CardContent className="flex  space-x-5">
        <Typography variant="body2" color="text.secondary">
          {post?.totalLikes} likes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* {comment?.length + " comments"} */}
          {post?.totalComments} comments
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="flex justify-between align-center">
        <div>
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
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      {showComments && (
        <section>
          {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
          <CreateCommentCard post={post} />
          <Divider />
          {commentData?.map((comment: any) => (
            <CommentCard key={comment} comment={comment} />
          ))}
          {/* </Collapse> */}
        </section>
      )}
    </Card>
  );
};

export default PostCard;
