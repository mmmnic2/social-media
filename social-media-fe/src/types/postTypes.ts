import { User } from "./userTypes";

export interface Post {
  id: number;
  caption: string;
  image: string | null;
  video: string | null;
  userResponse: User;
  totalLikes: number;
  totalComments: number;
  isCurrentUserLikePost: boolean;
  listUserLiked: User[] | null;
  createDate: string;
  modifiedDate: string;
}
