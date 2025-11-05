import { useState } from "react"
import api from "../api/api" // ✅ đúng import

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", password: "", password_confirmation: ""
  })
  const [message, setMessage] = useState("")

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      // ✅ Gọi đúng hàm register trong api.js (đã có sẵn gọi sanctum/csrf-cookie)
      await api.register(form)

      setMessage("✅ Đăng ký thành công! Vui lòng kiểm tra email để xác minh.")
      
      // (Tuỳ chọn) nếu muốn Laravel gửi mail xác minh ngay sau khi đăng ký:
      await api.getUser()
    } catch (err) {
      console.error(err)
      setMessage(err?.response?.data?.message || "❌ Có lỗi xảy ra.")
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 300, margin: "auto" }}>
      <h2>Đăng ký</h2>
      <input name="name" placeholder="Họ tên" value={form.name} onChange={onChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={onChange} />
      <input type="date" name="dob" placeholder="Ngày sinh" value={form.dob} onChange={onChange} />
      <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={onChange} required />
      <input type="password" name="password_confirmation" placeholder="Nhập lại mật khẩu" value={form.password_confirmation} onChange={onChange} required />
      <button type="submit">Tạo tài khoản</button>
      {message && <p>{message}</p>}
    </form>
  )
}
