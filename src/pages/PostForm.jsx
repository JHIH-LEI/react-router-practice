import { Form, Link } from "react-router-dom";
import { FormGroup } from "./FormGroup";

export function PostForm({ users, defaultValues = {} }) {
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <div className="form-group error">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={defaultValues.title}
          />
          <div className="error-message">Required</div>
        </div>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultValues.userId}>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            defaultValue={defaultValues.body}
          ></textarea>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" href="..">
          Cancel
        </Link>
        <button className="btn">Save</button>
      </div>
    </Form>
  );
}
