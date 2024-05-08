import { Link } from "react-router-dom";

export function UserPreview({ id, name, email, website, company }) {
  return (
    <div className="card">
      <div className="card-header">{name}</div>
      <div className="card-body">
        <div>{company.name}</div>
        <div>{website}</div>
        <div>{email}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`/users/${id}`}>
          View
        </Link>
      </div>
    </div>
  );
}
