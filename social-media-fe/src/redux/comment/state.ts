interface StateProps {
  comments: string[];
  commentSelected: string[];
  refetchAllComment: () => void;
  isRefetchAllComments: boolean;
}

export const initialState: StateProps = {
  comments: [],
  commentSelected: [],
  refetchAllComment: () => {},
  isRefetchAllComments: false,
};
