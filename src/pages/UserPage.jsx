import { User } from "./User";
import { PostList } from "./PostList";
import { TodoList } from "./TodoList";

export function UserPage() {
  return (
    <>
      <User />;
      <PostList />
      <TodoList />
    </>
  );
}
