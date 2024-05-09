import { BACKEND_URL } from "./base";
export async function putPost({ postId, options } = { options: {} }) {
  if (!postId) {
    throw Error("can not put post without post id");
  }
  return await fetch(`${BACKEND_URL}/posts/${postId}`, {
    ...options,
    method: "PUT",
  });
}
