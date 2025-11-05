import { Outlet, Link, useNavigate } from "react-router-dom";
import api from "./api/api"; // nếu m có api.logout()

export default function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Gọi API backend nếu có (Laravel Sanctum)
      await api.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Xóa token + user ở localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Chuyển hướng về trang login
      navigate("/login");
    }
  };

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Inter, system-ui" }}>
      <h1> Shop App</h1>

      {/* Thanh điều hướng */}
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <Link to="/">Trang chủ</Link>

        {!user && (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
            <Link to="/forgot-password">Quên mật khẩu</Link>
          </>
        )}

        {user && (
          <>
            <span>👋 {user.name} ({user.role})</span>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        )}
      </nav>

      {/* Hiển thị nội dung từng route con */}
      <Outlet />
    </div>
  );
}
