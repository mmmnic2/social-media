declare global {
  type NotificationType =
    | "FRIEND_REQUEST"
    | "TAG"
    | "LIKE_POST"
    | "COMMENT"
    | "MESSAGE"
    | "FRIEND_REQUEST_ACCEPTED";
  type UserStatus = "ONLINE" | "OFFLINE";
  type FriendshipStatus = "PENDING" | "ACCEPTED" | "DECLINED";
  type Gender = "MALE" | "FEMALE";
  type Role = "ROLE_ADMIN" | "ROLE_USER";
}
export {};
