import axios from "@/constant/apiConstant";

export async function getUserProfile() {
  const url = "/api/v1/user/profile";
  const response = await axios.get(url);
  return response.data;
}
export async function updateUserProfile(payload: any) {
  const url = "/api/v1/user/update";
  const res = await axios.put(url, payload);
  return res.data;
}
export async function getUserProfileById(userId: string | number) {
  const url = `/api/v1/user/${userId}`;
  const res = await axios.get(url);
  return res.data;
}
export async function findUserByEmail(email: string | null) {
  const url = `/api/v1/user/find-by-email?email=${email}`;
  const res = await axios.get(url);
  return res.data;
}
export async function searchUser(query: string | null) {
  const url = `/api/v1/user/search?query=${query}`;
  const res = await axios.get(url);
  return res.data;
}
export async function handleFollowUser(followedId: number) {
  const url = `/api/v1/user/follow/${followedId}`;
  const res = await axios.put(url);
  return res.data;
}
export async function uploadUserAvatar(payload: any) {
  const url = `/api/v1/user/upload-avatar`;
  const res = await axios.post(url, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
