import { useEffect, useState } from "react";
import api from "../api/api";

export default function UserHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.getUser().then(res => setUser(res.data)).catch(() => {});
  }, []);

  if (!user) return <p>Đang tải thông tin người dùng...</p>;

  return (
    <div>
      <h2>🏡 Trang người dùng</h2>
      <p>Xin chào {user.name}! Bạn đã đăng nhập thành công 🎉</p>
    </div>
  );
}
