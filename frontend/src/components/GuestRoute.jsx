import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = localStorage.getItem("token");

  // Nếu đã đăng nhập rồi không cho vào login/register nữa
  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
