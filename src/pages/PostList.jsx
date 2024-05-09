import { useLoaderData, Link, Form } from "react-router-dom";
import { PostCard } from "./PostCard";
export function PostList() {
  const { posts, users } = useLoaderData();
  return (
    <>
      <div className="container">
        <h1 className="page-title">
          Posts{" "}
          <div className="title-btns">
            <Link className="btn btn-outline" to="/posts/new">
              New
            </Link>
          </div>
        </h1>
        <Form method="get" className="form mb-4">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="query">Query</label>
              <input type="search" name="q" id="query" />
            </div>
            <div className="form-group">
              <label htmlFor="userId">Author</label>
              <select type="search" name="userId" id="userId">
                <option value="">Any</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn">Filter</button>
          </div>
        </Form>
        {posts?.length
          ? posts.map((post) => {
              return <PostCard key={post.id} {...post} />;
            })
          : "no posts"}
      </div>
    </>
  );
}
