import api from "./api/api"; // nếu có file api.js

const handleLogout = async () => {
  try {
    await api.logout(); // Gọi API Laravel để xóa token server
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
};
