import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import "./Translation/config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { UpdateTodo } from "./pages/UpdateTodo";
import { Main } from "./pages/Main";
import Login from "./pages/Login";
import { DragAndDropTable } from "./components/DragAndDropTable";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/old",
    element: <App />,
  },

  {
    path: "/update/:id",
    element: <UpdateTodo />,
  },
  {
    path: "/a",
    element: <DragAndDropTable />,
  },
  {
    path: "/",
    element: <Main />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
