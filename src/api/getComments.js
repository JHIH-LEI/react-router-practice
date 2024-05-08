import { BACKEND_URL } from "./base";
export async function getComments({ postId }) {
  const res = await fetch(`${BACKEND_URL}/comments?postId=${postId}`);
  return await res.json();
}
