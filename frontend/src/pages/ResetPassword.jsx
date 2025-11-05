import { useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.resetPassword({
        email,
        token,
        password,
        password_confirmation: confirm,
      });

      setMessage("✅ Đặt lại mật khẩu thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err.response);
      setMessage(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.email?.[0] ||
          "Có lỗi xảy ra."
      );
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
      <h2>🔑 Đặt lại mật khẩu</h2>
      <input type="email" value={email} disabled />
      <input
        type="password"
        placeholder="Mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Xác nhận mật khẩu"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />
      <button type="submit">Đặt lại mật khẩu</button>
      {message && <p>{message}</p>}
    </form>
  );
}
