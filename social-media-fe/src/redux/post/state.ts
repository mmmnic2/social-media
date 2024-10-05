export interface PostsStateProps {
  posts: object[];
  postSelected: object[];
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
