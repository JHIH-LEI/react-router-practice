import { BACKEND_URL } from "./base";

// params有很多情況的話要如何設計?
// {query: {key: "", value: ""}}
// 如果又支援多選的話如何設計？ 還是queryString直接傳進來更好？

export async function getTodos({ options, queryString }) {
  const url = `${BACKEND_URL}/todos${queryString}`;
  const res = await fetch(url, options);
  return await res.json();
}
