import axios from "@/constant/axiosClient";

export async function createComment(payload: {
  postId: number;
  postRequest: { content: string };
}) {
  const { postId, postRequest } = payload;
  const url = `/api/v1/comment/create-comment/post/${postId}`;
  const res = await axios.post(url, postRequest);
  return res.data;
}

export async function updateComment(payload: object) {
  const url = `/api/v1/comment/update`;
  const res = await axios.put(url, payload);
  return res.data;
}

export async function handleLikeAndUnlikeComment(commentId: number | string) {
  const url = `/api/v1/comment/like/${commentId}`;
  const res = await axios.put(url);
  return res.data;
}

export async function getByPostId(postId: number | null) {
  const url = `/api/v1/comment/get-by-post/${postId}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getAllComments() {
  const url = "/api/v1/comment/all";
  const res = await axios.get(url);
  return res.data;
}
