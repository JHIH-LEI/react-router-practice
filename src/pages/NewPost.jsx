import { useLoaderData } from "react-router-dom";
import { PostForm } from "./PostForm";
export function NewPost() {
  const { users } = useLoaderData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} />
    </>
  );
}
