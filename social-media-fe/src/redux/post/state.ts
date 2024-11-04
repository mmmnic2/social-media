import { Post } from "@/types/postTypes";

interface PostsStateProps {
  posts: Post[];
  postSelected: Post[];
  refetchAllPost: () => void;
  refetchPostByUser: () => void;
  isAllPostRefetch: boolean;
}

export const initialState: PostsStateProps = {
  posts: [],
  postSelected: [],
  refetchAllPost: () => {},
  refetchPostByUser: () => {},
  isAllPostRefetch: false,
};
