import axios from "@/constant/apiConstant";

export async function pendingFriendRequests() {
  const url = `/api/v1/friendship/all-pending-requests`;
  const res = await axios.get(url);
  return res.data;
}

export async function friendRequestActions(payload: any) {
  console.log(payload);
  const url = `/api/v1/friendship/respond/${payload?.requestId}?status=${payload?.status}`;
  const res = await axios.put(url);
  return res.data;
}
