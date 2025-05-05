import { createStore as vanillaCreateStore } from "zustand/vanilla";

export type commentState = {
  comments: any[] | [];
  isCommentRefetch: boolean;
  setComments: (comments: any[]) => void;
  setIsCommentRefetch: (val: boolean) => void;
  clearComments: () => void;
};

export const createCommentStore = (initial?: Partial<commentState>) =>
  vanillaCreateStore<commentState>((set) => ({
    comments: initial?.comments ?? [],
    isCommentRefetch: initial?.isCommentRefetch ?? false,
    setComments: (comments) => set({ comments }),
    setIsCommentRefetch: (val) => set({ isCommentRefetch: val }),
    clearComments: () => set({ comments: [] }),
  }));
