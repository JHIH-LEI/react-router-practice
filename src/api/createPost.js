import { BACKEND_URL } from "./base";
export async function createPost({ options }) {
  return fetch(`${BACKEND_URL}/posts`, { ...options, method: "POST" });
}
