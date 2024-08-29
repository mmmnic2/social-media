interface StateProps {
  posts: object[];
  postSelected: object[];
  refetchAllPost: () => void;
  refetchPostByUser: () => void;
}

export const initialState: StateProps = {
  posts: [],
  postSelected: [],
  refetchAllPost: () => {},
  refetchPostByUser: () => {},
};
