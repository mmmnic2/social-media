import { useMutation, useQuery } from "@tanstack/react-query";
import {
  friendRequestActions,
  pendingFriendRequests,
  sendFriendRequest,
} from "@/api/friendrequests";

export const usePendingFriendRequests = () => {
  return useQuery({
    queryKey: ["pending-requests"],
    queryFn: pendingFriendRequests,
  });
};

export const useFriendRequestActions = () => {
  return useMutation({
    mutationFn: friendRequestActions,
  });
};

export const useSendFriendRequest = () => {
  return useMutation({
    mutationFn: sendFriendRequest,
  });
};
