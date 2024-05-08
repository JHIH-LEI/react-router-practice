import { useLoaderData } from "react-router-dom";
import { UserPreview } from "./UserPreview";

export function UserList() {
  const users = useLoaderData();

  return (
    <>
      <div className="container">
        <h1 className="page-title">Users</h1>
        <div className="card-grid">
          {users.length
            ? users.map((user) => <UserPreview key={user.id} {...user} />)
            : "no users"}
        </div>
      </div>
    </>
  );
}
