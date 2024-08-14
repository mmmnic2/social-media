import axios from "@/constant/apiConstant";

export async function login(payload: { email: string; password: string }) {
  const url = "/auth/authenticate";
  //dòng code dưới để tạo bản sao của payload => không cần cũng được
  const request = { ...payload };
  const response = await axios.post(url, request);
  return response.data;
}
export async function register(payload: {
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  email: string;
}) {
  const url = "/auth/register";
  const request = { ...payload };
  const response = await axios.post(url, request);
  return response.data;
}
export async function logout() {
  const url = "/auth/logout";
  return axios.post(url);
}
