import axios from "axios";
import store from "@/redux/store";
import { error } from "console";
const BASE_URL = "http://localhost:8080";
const instance = axios.create({
  baseURL: BASE_URL,
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
  }
);
export default instance;
