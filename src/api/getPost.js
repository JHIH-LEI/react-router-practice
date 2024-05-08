import { BACKEND_URL } from "./base";
export async function getPost(id) {
  try {
    const postDataResponse = await fetch(`${BACKEND_URL}/posts/${id}`);
    const postData = await postDataResponse.json();

    const userDataResponse = await fetch(
      `${BACKEND_URL}/users/${postData.userId}`
    );
    const userData = await userDataResponse.json();

    postData.user = userData;
    return postData;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}
