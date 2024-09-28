import { useMutation, useQuery } from "react-query";
import {
  friendRequestActions,
  pendingFriendRequests,
  sendFriendRequest,
} from "@/api/friendrequests";

export const usePendingFriendRequests = () => {
  return useQuery(["pending-requests"], pendingFriendRequests);
};

export const useFriendRequestActions = () => {
  return useMutation(friendRequestActions);
};

export const useSendFriendRequest = () => {
  return useMutation(sendFriendRequest);
};
