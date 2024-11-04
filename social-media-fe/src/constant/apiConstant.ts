import axios from "axios";
import store from "@/redux/store";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default instance;
