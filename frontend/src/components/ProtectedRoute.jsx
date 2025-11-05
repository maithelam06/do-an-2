import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  //Nếu chưa đăng nhập → chặn
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  //Nếu yêu cầu quyền admin mà user không phải admin → chặn
  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  // Nếu ok thì cho render tiếp
  return children;
}
