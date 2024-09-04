"use client";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAllComment } from "@/hooks/api-hooks/comment-hooks/useComment";
import { useGetAllPosts } from "@/hooks/api-hooks/post-hooks/usePost";
import { setAllComments, setRefetchAllComment } from "@/redux/comment/comment";
import { setAllPost, setRefetchAllPost } from "@/redux/post/post";
import HomeRight from "./homeright/HomeRight";
import MiddlePart from "./middlepart/MiddlePart";
const HomePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(0);
  const { data: allPosts, refetch: refetchAllPost } = useGetAllPosts();
  useEffect(() => {
    dispatch(setAllPost(allPosts));
    dispatch(setRefetchAllPost(refetchAllPost));
  }, [allPosts, dispatch, refetchAllPost]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Grid container>
      <Grid item lg={8} className="px-4 flex justify-center ">
        <MiddlePart />
      </Grid>
      <Grid item lg={4} className="relative">
        <div className="sticky top-0 w-full">
          <HomeRight />
        </div>
      </Grid>
    </Grid>
  );
};

export default HomePage;
