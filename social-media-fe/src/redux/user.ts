import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/userTypes";

const initialState: User = {
  id: null,
  email: "",
  firstName: "",
  lastName: "",
  gender: "MALE",
  createAt: "",
  updateAt: "",
  followers: [],
  followings: [],
  role: "ROLE_USER",
  userStatus: "OFFLINE",
  imageUrl: "",
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
      state.firstName = firstName;
      state.lastName = lastName;
      state.gender = gender;
      state.followers = followerList;
      state.followings = followingList;
      state.imageUrl = imageUrl;
      state.createAt = createDate;
      state.updateAt = modifiedDate;
      state.role = role;
      state.userStatus = userStatus;
    },
    clearUserInfo: (state: User) => {
      Object.assign(state, initialState);
    },
    updateUserInfo: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.gender = payload.gender;
      // state.followers = payload.followerList;
      // state.followings = payload.followingList;
      // state.user_image = userImage;
      state.createAt = payload.createDate;
      state.updateAt = payload.modifiedDate;
      state.userStatus = payload.userStatus;
      state.role = payload.role;
    },
  },
});
export const { setUserInfo, clearUserInfo, updateUserInfo } = user.actions;

export default user.reducer;
