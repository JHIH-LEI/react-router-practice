export function Todo({ completed, title }) {
  return <li className={completed ? "strike-through" : undefined}>{title}</li>;
}
