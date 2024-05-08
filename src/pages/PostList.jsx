import { useLoaderData } from "react-router-dom";
import { PostCard } from "./PostCard";
export function PostList() {
  const { posts } = useLoaderData();
  return (
    <>
      <div className="container">
        <h1 className="page-title">Posts</h1>
        {posts?.length
          ? posts.map((post) => {
              return <PostCard key={post.id} {...post} />;
            })
          : "no posts"}
      </div>
    </>
  );
}
