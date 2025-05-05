import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserProfile,
  findUserByEmail,
  getUserProfileById,
  updateUserProfile,
  searchUser,
  uploadUserAvatar,
} from "@/api/user";

export const useGetUserProfile = (token: string | null) => {
  return useQuery({
    queryKey: ["user_profile"],
    queryFn: getUserProfile,
    enabled: !!token,
  });
};
export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
  });
};
export const useGetUserById = (userId: string | number | null) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserProfileById(userId),
    enabled: !!userId,
  });
};
export const useFindUserByEmail = (email: string | null) => {
  return useQuery({
    queryKey: ["user", email],
    queryFn: () => findUserByEmail(email),
  });
};
export const useSearchUser = () => {
  return useMutation({
    mutationFn: searchUser,
  });
};
export const useUploadUserAvatar = () => {
  return useMutation({
    mutationFn: uploadUserAvatar,
  });
};
