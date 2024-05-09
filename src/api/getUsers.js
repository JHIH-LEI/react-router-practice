import { BACKEND_URL } from "./base";
export async function getUsers(data = { options: {} }) {
  return (await fetch(`${BACKEND_URL}/users`, data.options)).json();
}
