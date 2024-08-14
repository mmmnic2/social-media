import axios from "@/constant/apiConstant";

export async function createChat(payload: any) {
  const url = `/api/v1/chat/create-chat`;
  const res = await axios.post(url, payload);
  return res.data;
}

export async function getChatById(chatId: number) {
  const url = `/api/v1/chat/${chatId}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getChatsByUser() {
  const url = `api/v1/chat/get-by-user`;
  const res = await axios.get(url);
  return res.data;
}
