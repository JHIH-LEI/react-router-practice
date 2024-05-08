import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Post } from "./pages/Post";
import { PostList } from "./pages/PostList";
import { UserList } from "./pages/UserList";
import "../styles.css";
import { TodoList } from "./pages/TodoList";
import { PostPage } from "./pages/PostPage";
import { getPost } from "./api/getPost";
import { Root } from "./pages/Root";
import { ErrorBoundary } from "./pages/ErrorBoundary";
import { CommentList } from "./pages/Comments/CommentList";
import { UserPage } from "./pages/UserPage";
import { getTodos } from "./api/getTodos";
import { getComments } from "./api/getComments";
const BACKEND_URL = import.meta.env.VITE_URL;
// 因為Loader會load整條父母，子的母loader在子也會load?, 所以啥時應該作為childer?

// TODO: abort
const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "/posts",
            element: <PostList />,
            loader: async ({ request }) => {
              const userId = new URL(request.url).searchParams.get("userId");
              const url = userId
                ? `${BACKEND_URL}/posts?userId=${userId}`
                : `${BACKEND_URL}/posts`;
              const postsRes = await fetch(url, { signal: request.signal });
              return { posts: await postsRes.json() };
            },
          },
          {
            path: "/posts/:postId",
            element: <PostPage />,
            loader: async ({ params }) => {
              const [post, comments] = await Promise.all([
                getPost(params.postId),
                getComments({ postId: params.postId }),
              ]);
              return { post, comments };
            },
          },
          {
            path: "/posts/:postId/comments",
            loader: async ({ params }) => {
              const res = await fetch(
                `${BACKEND_URL}/comments?postId=${params.postId}`
              );
              const comments = await res.json();
              return { comments };
            },
            element: <CommentList />,
          },
          {
            path: "/users",
            element: <UserList />,
            loader: ({ request }) => {
              return fetch(`${BACKEND_URL}/users`, { signal: request.signal });
            },
          },
          {
            path: "/users/:userId",
            element: <UserPage />,
            loader: async ({ params, request }) => {
              const [userRes, postsRes, todosRes] = await Promise.all([
                fetch(`${BACKEND_URL}/users/${params.userId}`, {
                  signal: request.signal,
                }),
                fetch(`${BACKEND_URL}/posts?userId=${params.userId}`),
                fetch(`${BACKEND_URL}/todos?userId=${params.userId}`),
              ]);
              const [posts, user, todos] = await Promise.all([
                postsRes.json(),
                userRes.json(),
                todosRes.json(),
              ]);
              return { user, posts, todos };
            },
          },
          {
            path: "/todos",
            element: <TodoList />,
            loader: async ({ request }) => {
              const userId = new URL(request.url).searchParams.get("userId");
              const todos = await getTodos({
                userId,
                options: {
                  signal: request.signal,
                },
                queryString: userId ? `?userId=${userId}` : "",
              });

              return { todos };
            },
          },
        ],
      },
      {
        path: "*",
        element: <h1>404 - page not found</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
