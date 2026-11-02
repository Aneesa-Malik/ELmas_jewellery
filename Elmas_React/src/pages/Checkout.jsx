import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { load, save } from "../context/storage.js";
import { useDocumentTitle, formatRs } from "../hooks.js";
import "../styles/pg-checkout.css";

export default function Checkout() {
  useDocumentTitle("Boutique Checkout | ELMAS Jewellery");
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  // Login zaroori hai: nahi hai to login page par bhejo, login ke baad yahin wapas aayega
  if (!user && !orderPlaced) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: "/checkout", message: "Order karne ke liye pehle login karein." }}
      />
    );
  }

  // Same rule as the PHP page: nothing in the bag -> go back to the cart
  if (!orderPlaced && items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  // Equivalent of INSERT INTO orders + order_details
  function placeOrder(e) {
    e.preventDefault();
    const orders = load("elmas_orders", []);
    const order = {
      id: orders.length + 1,
      customer_name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      user_id: user ? user.id : null,
      total_bill: total,
      order_status: "Pending",
      date: new Date().toISOString(),
      details: items.map((i) => ({ product_id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
    };
    save("elmas_orders", [...orders, order]);
    clearCart();
    setOrderPlaced(true);
  }

  return (
    <div className="pg-checkout">
      <div className="container" style={{ paddingTop: 60, paddingBottom: 90 }}>
        {orderPlaced ? (
          <div className="success-card shadow-sm">
            <i className="bi bi-patch-check-fill text-success" style={{ fontSize: "4rem" }}></i>
            <h2 className="mt-3">Order Confirmed!</h2>
            <p className="text-muted small mt-2">
              Thank you for choosing ELMAS. Your request for high-end luxury pieces has been registered in our order records.
            </p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "var(--luxury-gold)" }} className="my-3">
              "Real elegance stays connected forever."
            </div>
            <Link to="/collections" className="btn btn-dark px-4 py-2 mt-2" style={{ borderRadius: 0 }}>Return to Gallery</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="checkout-box p-4 p-md-5">
                <h4 className="mb-4"><i className="bi bi-person-lines-fill me-2 text-muted"></i> Secure Billing Information</h4>

                <form onSubmit={placeOrder}>
                  <div className="mb-3">
                    <label className="form-label small text-uppercase fw-semibold text-muted">Full Name</label>
                    <input type="text" className="form-control" placeholder="e.g., Ayesha Malik" required value={form.name} onChange={update("name")} />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label small text-uppercase fw-semibold text-muted">Phone Number</label>
                      <input type="tel" className="form-control" placeholder="e.g., 03001234567" required value={form.phone} onChange={update("phone")} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label small text-uppercase fw-semibold text-muted">Email Address</label>
                      <input type="email" className="form-control" placeholder="name@domain.com" required value={form.email} onChange={update("email")} />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small text-uppercase fw-semibold text-muted">Shipping Boutique Destination Address</label>
                    <textarea className="form-control" rows="4" placeholder="Enter complete home or studio address details securely..." required value={form.address} onChange={update("address")}></textarea>
                  </div>
                  <button type="submit" className="btn btn-order shadow-sm">Authorize &amp; Place Order</button>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="checkout-box p-4 bg-white">
                <h5 className="mb-4 pb-2 border-bottom"><i className="bi bi-receipt me-2 text-muted"></i> Selected Invoice Summary</h5>

                {items.map((item) => (
                  <div className="d-flex justify-content-between summary-item" key={item.key}>
                    <div>
                      <strong className="text-dark">{item.name}</strong>
                      <div className="text-muted small">Quantity: {item.quantity}</div>
                    </div>
                    <span className="fw-semibold text-secondary">{formatRs(item.price * item.quantity)}</span>
                  </div>
                ))}

                <div className="d-flex justify-content-between align-items-center pt-3 mt-3 border-top">
                  <span className="text-uppercase fw-bold small text-muted">Payable Gross Total:</span>
                  <span className="fs-4 fw-bold text-success">{formatRs(total)}</span>
                </div>

                <div className="mt-4 p-3 bg-light text-center border">
                  <i className="bi bi-shield-lock-fill text-primary me-2"></i>
                  <span className="small text-muted text-uppercase">End-to-End Encrypted Secure Gateway</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
