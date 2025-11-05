import { useState } from "react";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.forgotPassword(email);
      setMessage("✅ Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư.");
    } catch (err) {
      console.error(err);
      if (err.response) {
        setMessage(` ${err.response.data.message || "Có lỗi từ server."}`);
      } else {
        setMessage(" Không thể kết nối đến server!");
      }
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
      <h2>Quên mật khẩu</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Gửi email đặt lại</button>
      {message && <p>{message}</p>}
    </form>
  );
}
