export interface User {
  id: number | null;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  createAt: string;
  updateAt: string;
  followers: [];
  followings: [];
  role?: Role;
  userStatus: UserStatus;
  imageUrl?: string | null;
}
