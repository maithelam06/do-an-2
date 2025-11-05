import axios from "axios";
import Cookies from "js-cookie";

// 🧩 Interceptor: tự động gắn XSRF token
axios.interceptors.request.use((config) => {
  const token = Cookies.get("XSRF-TOKEN");
  if (token) config.headers["X-XSRF-TOKEN"] = token;
  return config;
});

// ⚙️ Cấu hình mặc định
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const api = {
  // Đăng ký
  async register(data) {
    await axios.get("/sanctum/csrf-cookie");
    return axios.post("/api/register", data);
  },

  // Đăng nhập
  async login(data) {
    await axios.get("/sanctum/csrf-cookie");
    return axios.post("/api/login", data);
  },

  // Đăng xuất
  async logout() {
    return axios.post("/api/logout");
  },

  // Lấy user hiện tại
  async getUser() {
    return axios.get("/api/user");
  },

  // Gửi mail quên mật khẩu
  async forgotPassword(email) {
    await axios.get("/sanctum/csrf-cookie");
    return axios.post("/forgot-password", { email });
  },

  // 🆕 Đặt lại mật khẩu mới
  async resetPassword({ email, token, password, password_confirmation }) {
    await axios.get("/sanctum/csrf-cookie");
    return axios.post("/reset-password", {
      email,
      token,
      password,
      password_confirmation,
    });
  },
};

export default api;
