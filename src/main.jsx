import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./providers/AuthProvider";
import { ThemeProvider } from "./components/theme-change/theme-provider";
import { Toaster } from "react-hot-toast";
import TaskBoard from "./pages/TaskBoard/TaskBoard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/taskboard",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <TaskBoard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
