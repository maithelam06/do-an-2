import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      // Gọi API login
      const res = await api.login(form);
      const data = res.data;

      // Lưu token
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Hiển thị thông báo
      setMessage("✅ Đăng nhập thành công!");

      // Điều hướng theo role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || " Email hoặc mật khẩu không đúng.");
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 300, margin: "auto" }}>
      <h2>Đăng nhập</h2>
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={onChange} required />
      <button type="submit">Đăng nhập</button>
      {message && <p>{message}</p>}
    </form>
  );
}
