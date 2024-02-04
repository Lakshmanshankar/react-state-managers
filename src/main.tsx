import { TodoProvider as TodoContextProvider } from "@/Todos/Context/Todo.tsx";
import { TodoReducerProvider } from "@/Todos/Reducer/Todo.tsx";

import TodoContext,{CheckContext,ContextTable} from '@/Todos/Context/TodoUI.tsx'
import StateTodo from "./Todos/State/TodoUI";
import ReducerTodo, { CheckReducer,ReducerTable} from "@/Todos/Reducer/TodoUI";
import ZustandTodos, { CheckZustand,ZustandTable} from '@/Todos/Zustand/TodoUI.tsx'
import JotaiTodos, {CheckJotai,JotaiRenderTable} from '@/Todos/Jotai/TodoUI.tsx'

import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./Providers/ThemeProvider.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/context",
    element: <div className=" min-h-screen dark:bg-zinc-950">
      <TodoContext />
      <ContextTable />
      <CheckContext/>
    </div>,
  },
  {
    path: "/state",
    element: <div className="min-h-screen dark:bg-zinc-950">
      <StateTodo />
    </div>,
  },
  {
    path: "/reducer",
    element: <div className="min-h-screen dark:bg-zinc-950">
      <ReducerTodo />
      <ReducerTable/>
      <CheckReducer/>
    </div>,
  },
  {
    path: "/zustand",
    element: <div className="min-h-screen dark:bg-zinc-950">
      <ZustandTodos />
      <ZustandTable/>
      <CheckZustand/>
    </div>,
  },
  {
    path: "/jotai",
    element: <div className="min-h-screen dark:bg-zinc-950">
      <JotaiTodos />
      <JotaiRenderTable/>
      <CheckJotai/>
    </div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TodoContextProvider>
        <TodoReducerProvider>
          <RouterProvider router={router} />
        </TodoReducerProvider>
      </TodoContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
