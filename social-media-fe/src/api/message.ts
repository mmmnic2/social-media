import axios from "@/constant/axiosClient";

export async function createMessage(payload: {
  chatId: number;
  content: string | null;
  image: string | null;
}) {
  const url = `/api/v1/message/create-message`;
  // const formData = new FormData();
  // formData.append("caption", caption);
  // formData.append("image", image);
  // formData.append("video", video);
  // const res = await axios.post(url, formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  const res = await axios.post(url, payload);
  return res.data;
}

export async function getMessageByChatId(chatId: number) {
  const url = `/api/v1/message/${chatId}`;
  const res = await axios.get(url);
  return res.data;
}
