import { useLoaderData } from "react-router-dom";
import { CommentCard } from "./CommentCard";

export function CommentList() {
  const { comments } = useLoaderData();
  return (
    <>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments &&
          comments.map((comment) => {
            return <CommentCard key={comment.id} comment={comment} />;
          })}
      </div>
    </>
  );
}
