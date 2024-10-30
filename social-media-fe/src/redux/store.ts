import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import chatReducer from "./chat/chat";
import commentReducer from "./comment/comment";
import messageReducer from "./message/message";
import notiReducer from "./notifications/notifications";
import postReducer from "./post/post";
import userReducer from "./user";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"],
  blacklist: [],
};
//combineReducers dùng để kết hợp tất cả các reducer riêng lẻ thành một root reducer.
const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  chat: chatReducer,
  message: messageReducer,
  noti: notiReducer,
});
const isClientMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  if (typeof window !== "undefined") {
    return next(action);
  } else {
    return next({ ...action, type: `${action.type}_SERVER` });
  }
};
// tạo thành một reducer với persistconfig tương ứng
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(isClientMiddleware),
});

export const persistor = persistStore(store);
export default store;
