interface StateProps {
  comments: string[];
  commentSelected: string[];
  refetchAllComment: () => void;
}

export const initialState: StateProps = {
  comments: [],
  commentSelected: [],
  refetchAllComment: () => {},
};
