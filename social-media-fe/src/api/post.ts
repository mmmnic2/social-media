import axios from "@/constant/apiConstant";

export async function getPostByUserId(userId?: number | string) {
  const url = `/api/v1/post/find-by-user/${userId}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getAllPost() {
  const url = `/api/v1/post/all`;
  const res = await axios.get(url);
  return res.data;
}

export async function getPostById(postId: number | string) {
  const url = `/api/v1/post/${postId}`;
  const res = await axios.get(url);
  return res.data;
}

export async function deletePost(postId: number | string) {
  const url = `/api/v1/post/delete/${postId}`;
  const res = await axios.delete(url);
  return res.data;
}

export async function likePost(postId: number | string) {
  const url = `/api/v1/post/like/${postId}`;
  const res = await axios.put(url);
  return res.data;
}

export async function savePost(postId: number | string) {
  const url = `/api/v1/post/saved-post/${postId}`;
  const res = await axios.put(url);
  return res.data;
}
export async function createPost(payload: {
  caption: any;
  image?: any;
  video?: any;
}) {
  const { caption, image, video } = payload;
  const url = `/api/v1/post/create-post`;
  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("image", image);
  formData.append("video", video);
  const res = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
