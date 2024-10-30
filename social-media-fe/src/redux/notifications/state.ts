import { UserProps } from "../user";

export enum NotificationType {
  "FRIEND_REQUEST" = "FRIEND_REQUEST",
  "TAG" = "TAG",
  "LIKE_POST" = "LIKE_POST",
  "COMMENT" = "COMMENT",
  "MESSAGE" = "MESSAGE",
}

interface UserInfo {
  createDate: string;
  email: string;
  firstName: string;
  followerList: [];
  followingList: [];
  gender: string;
  id: number;
  lastName: string;
  modifiedDate: string;
  userStatus: string;
}

export interface NotiInfo {
  notificationId: number;
  sender: UserInfo;
  read: boolean;
  receiver: UserInfo;
  type: NotificationType;
  message: string;
  createDate: string;
  modifiedDate: string;
}

interface InitialNotification {
  allNotifications: NotiInfo[];
}

export const initialState: InitialNotification = {
  allNotifications: [],
};
