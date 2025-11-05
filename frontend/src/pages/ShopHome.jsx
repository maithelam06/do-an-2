import { Link } from "react-router-dom";

export default function ShopHome() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const products = [
    { id: 1, name: "Áo thun Basic", price: 199000 },
    { id: 2, name: "Quần jeans Nam", price: 399000 },
    { id: 3, name: "Giày sneaker Nữ", price: 499000 },
  ];

  const handleAddToCart = (product) => {
    if (!user) {
      alert("🛒 Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    // Ở bước sau có thể lưu vào localStorage hoặc gọi API backend
    alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <div>
      <h2>🛍️ Sản phẩm nổi bật</h2>
      {user ? (
        <p>👋 Xin chào, <b>{user.name}</b> — hãy mua sắm vui vẻ nhé!</p>
      ) : (
        <p>🔒 <Link to="/login">Đăng nhập</Link> để thanh toán nhanh hơn.</p>
      )}

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              boxShadow: "2px 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3>{p.name}</h3>
            <p>Giá: {p.price.toLocaleString()}₫</p>
            <button onClick={() => handleAddToCart(p)}>Thêm vào giỏ hàng</button>
          </div>
        ))}
      </div>
    </div>
  );
}
