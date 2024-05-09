import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
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
import { NewPost } from "./pages/NewPost";
import { getUsers } from "./api/getUsers";
import { createPost } from "./api/createPost";
import { EditPost } from "./pages/EditPost";
import { putPost } from "./api/putPost";
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
          { index: 1, element: <Navigate to="/posts" /> },
          {
            path: "/posts",
            element: <PostList />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const searchParams = url.searchParams;
              const queryByUserId = !searchParams.get("userId")
                ? ""
                : `&userId=${searchParams.get("userId")}`;
              const query = searchParams.get("q")
                ? `q=${searchParams.get("q")}`
                : "q=";

              const requestUrl = `${BACKEND_URL}${url.pathname}?${query}${queryByUserId}`;
              const [postsRes, users] = await Promise.all([
                fetch(requestUrl, { signal: request.signal }),
                getUsers({ options: { signal: request.signal } }),
              ]);
              return { posts: await postsRes.json(), users };
            },
          },
          {
            path: "/posts/new",
            element: <NewPost />,
            loader: async ({ request }) => {
              const users = await getUsers({
                options: { signal: request.signal },
              });
              return { users };
            },
            action: async ({ request }) => {
              const formData = await request.formData();
              const updates = Object.fromEntries(formData);

              await createPost({
                options: {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", // 根据实际情况设置请求头
                  },
                  body: JSON.stringify(updates),
                },
              });

              return redirect("/posts");
            },
          },
          {
            path: "/posts/:postId/edit",
            element: <EditPost />,
            loader: async ({ params, request }) => {
              const [post, users] = await Promise.all([
                getPost(params.postId),
                getUsers({ options: request.signal }),
              ]);
              return { users, post };
            },
            action: async ({ request, params }) => {
              const formData = await request.formData();
              const update = Object.fromEntries(formData);
              await putPost({
                postId: params.postId,
                options: {
                  body: JSON.stringify(update),
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json", // 根据实际情况设置请求头
                  },
                },
              });
              return redirect(`/posts/${params.postId}`);
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
              return getUsers({ options: { signal: request.signal } });
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
