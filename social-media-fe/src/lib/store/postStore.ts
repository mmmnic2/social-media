import { createStore as vanillaCreateStore } from "zustand/vanilla";
import { Post } from "@/types/postTypes";

export type PostState = {
  posts: Post[] | null;
  isPostsRefetch: boolean;
  setPosts: (posts: Post[]) => void;
  setIsPostsRefetch: (val: boolean) => void;
  clearPosts: () => void;
};

export const createPostStore = (initial?: Partial<PostState>) =>
  vanillaCreateStore<PostState>((set) => ({
    posts: initial?.posts ?? [],
    isPostsRefetch: initial?.isPostsRefetch ?? false,
    setPosts: (posts) => set({ posts }),
    setIsPostsRefetch: (val) => set({ isPostsRefetch: val }),
    clearPosts: () => set({ posts: [] }),
  }));
