import { useLoaderData } from "react-router-dom";
import { Todo } from "./Todo";

export function TodoList() {
  const { todos } = useLoaderData();
  return (
    <>
      <div className="container">
        <h1 className="page-title">Todos</h1>
        <ul>
          {todos.length
            ? todos.map((todo) => {
                return <Todo key={todo.id} {...todo} />;
              })
            : "no todos"}
        </ul>
      </div>
    </>
  );
}
