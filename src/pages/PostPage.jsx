import { Post } from "./Post";
import { CommentList } from "./Comments/CommentList";

export function PostPage() {
  return (
    <div className="container">
      <Post />
      <CommentList />
    </div>
  );
}
