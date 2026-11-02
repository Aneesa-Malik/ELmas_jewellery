import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useDocumentTitle, formatRs } from "../hooks.js";
import "../styles/pg-cart.css";

export default function Cart() {
  useDocumentTitle("Shopping Bag | ELMAS Jewellery");
  const { items, removeItem, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Order ke next step se pehle login zaroori hai
  function goCheckout(e) {
    if (user) return;
    e.preventDefault();
    navigate("/login", { state: { from: "/checkout", message: "Order karne ke liye pehle login karein." } });
  }
  const empty = items.length === 0;

  return (
    <div className="pg-cart">
      <div className="container" style={{ paddingTop: 50, paddingBottom: 50 }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
          <h2>
            {empty ? (
              <i className="bi bi-bag-dash text-muted me-2" style={{ position: "relative" }}>
                <i className="bi bi-lock-fill text-danger" style={{ fontSize: "0.9rem", position: "absolute", bottom: -2, right: -4 }}></i>
              </i>
            ) : (
              <i className="bi bi-bag-check-fill text-success me-2" style={{ position: "relative" }}>
                <i className="bi bi-unlock-fill text-success" style={{ fontSize: "0.9rem", position: "absolute", bottom: -2, right: -4 }}></i>
              </i>
            )}
            Shopping Bag
          </h2>
          <Link to="/" className="btn btn-continue">Continue Shopping</Link>
        </div>

        {!empty && (
          <div className="unlocked-banner p-3 mt-4 d-flex align-items-center shadow-sm">
            <i className="bi bi-shield-check fs-4 me-3"></i>
            <div>
              <strong>Bag Unlocked!</strong> Premium selection successfully computed. You have chosen{" "}
              <strong>{items.length} masterpiece item(s)</strong>. Your billing metrics are systematically synchronized below.
            </div>
          </div>
        )}

        <div className="card cart-card">
          <div className="card-body p-0">
            {empty ? (
              <div className="text-center py-5">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <i className="bi bi-bag-x text-muted" style={{ fontSize: "4rem" }}></i>
                  <i className="bi bi-lock-fill text-danger fs-3" style={{ position: "absolute", bottom: 0, right: 0 }}></i>
                </div>
                <h5 className="mt-3 fw-semibold text-muted">Your luxury shopping bag is currently locked &amp; empty.</h5>
                <div className="luxury-greeting-note mb-3">
                  <i className="bi bi-stars"></i> We wish you an exquisite shopping experience with ELMAS today! <i className="bi bi-stars"></i>
                </div>
                <Link to="/collections" className="btn btn-dark btn-sm px-4 py-2" style={{ borderRadius: 0 }}>Go to Shop</Link>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Product Item</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Subtotal</th>
                        <th className="text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.key}>
                          <td className="fw-semibold">
                            <i className="bi bi-gem text-warning me-2 small"></i>{item.name}
                          </td>
                          <td className="text-center text-muted">{formatRs(item.price)}</td>
                          <td className="text-center fw-medium">{item.quantity}</td>
                          <td className="text-end fw-semibold">{formatRs(item.price * item.quantity)}</td>
                          <td className="text-center">
                            <button
                              className="btn p-0 border-0 text-danger"
                              onClick={() => removeItem(item.key)}
                              aria-label={`Remove ${item.name}`}
                            >
                              <i className="bi bi-trash3-fill fs-5"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: "#f8fafc" }}>
                        <td colSpan="3" className="text-end fw-bold text-uppercase">Estimated Grand Total:</td>
                        <td className="text-end fw-bold text-success fs-5">{formatRs(total)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-light border-top text-end">
                  <Link to="/checkout" className="btn btn-checkout" onClick={goCheckout}>
                    Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
