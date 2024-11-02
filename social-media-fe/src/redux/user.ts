import { createSlice } from "@reduxjs/toolkit";

export interface UserProps {
  user: any;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  create_at: string;
  update_at: string;
  followers: [];
  followings: [];
  role: string;
  userStatus: string;
  imageUrl: string;
}

const initialState = {
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  gender: null,
  // user_image: null,
  create_at: null,
  update_at: null,
  followers: [],
  followings: [],
  role: null,
  userStatus: null,
  imageUrl: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const {
        id,
        email,
        lastName,
        firstName,
        imageUrl,
        gender,
        followerList,
        followingList,
        createDate,
        modifiedDate,
        role,
        userStatus,
      } = action.payload;

      state.id = id;
      state.email = email;
      state.first_name = firstName;
      state.last_name = lastName;
      state.gender = gender;
      state.followers = followerList;
      state.followings = followingList;
      state.imageUrl = imageUrl;
      state.create_at = createDate;
      state.update_at = modifiedDate;
      state.role = role;
      state.userStatus = userStatus;
    },
    clearUserInfo: (state: any) => {
      for (const key in state) {
        state[key] = null;
      }
    },
    updateUserInfo: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.first_name = payload.firstName;
      state.last_name = payload.lastName;
      state.gender = payload.gender;
      // state.followers = payload.followerList;
      // state.followings = payload.followingList;
      // state.user_image = userImage;
      state.create_at = payload.createDate;
      state.update_at = payload.modifiedDate;
      state.userStatus = payload.userStatus;
      state.role = payload.role;
    },
  },
});
export const { setUserInfo, clearUserInfo, updateUserInfo } = user.actions;

export default user.reducer;
