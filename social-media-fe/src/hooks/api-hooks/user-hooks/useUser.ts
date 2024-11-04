import { useMutation, useQuery } from "react-query";
import {
  getUserProfile,
  findUserByEmail,
  getUserProfileById,
  updateUserProfile,
  searchUser,
  uploadUserAvatar,
} from "@/api/user";

export const useGetUserProfile = (token: string | null) => {
  return useQuery("user_profile", getUserProfile, {
    enabled: !!token,
  });
};
export const useUpdateUserProfile = () => {
  return useMutation("update_profile", updateUserProfile);
};
export const useGetUserById = (userId: string | number | null) => {
  return useQuery(["user", userId], () => getUserProfileById(userId), {
    enabled: !!userId,
  });
};
export const useFindUserByEmail = (email: string | null) => {
  return useQuery(["user", email], () => findUserByEmail(email));
};
export const useSearchUser = () => {
  return useMutation(searchUser);
};
export const useUploadUserAvatar = () => {
  return useMutation(uploadUserAvatar);
};
