import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export function Post() {
  const { post } = useLoaderData();
  return (
    <div className="container">
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{post.user.name}</Link>
      </span>
      <div>{post.body}</div>
    </div>
  );
}
