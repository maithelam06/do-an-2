import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"; //thêm Navigate ở đây
import App from "./App.jsx";
import ShopHome from "./pages/ShopHome.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Admin from "./pages/Admin.jsx";
import UserHome from "./pages/UserHome.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //ty app
    children: [
      { index: true, element: <ShopHome /> },
      { path: "home", element: <Navigate to="/" replace /> }, // redirect /home → /
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
       { path: "password-reset/:token", element: <ResetPassword /> },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "password-reset/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
