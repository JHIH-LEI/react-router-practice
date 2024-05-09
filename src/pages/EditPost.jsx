import { useLoaderData, Form, Link } from "react-router-dom";

export function EditPost() {
  const { post, users } = useLoaderData();
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="put" className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" defaultValue={post.body}></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to={`/posts/${post.id}`}>
            Cancel
          </Link>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  );
}
