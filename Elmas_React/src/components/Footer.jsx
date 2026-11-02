import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateText = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  const timeText = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <footer className="pt-5 pb-3 site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4 className="fw-bold text-uppercase mb-3 footer-brand">💎 Elmas Jewelry</h4>
            <p className="text-muted small lh-lg footer-text">
              Every piece of jewelry tells a story. At Elmas, we craft timeless elegance, blending traditional
              royal layouts with modern aesthetic perfection. Discover luxury designed uniquely for you.
            </p>
            <div className="mt-3">
              <a href="#" className="text-decoration-none text-muted me-3"><i className="bi bi-instagram footer-icon"></i></a>
              <a href="#" className="text-decoration-none text-muted me-3"><i className="bi bi-facebook footer-icon"></i></a>
              <a href="#" className="text-decoration-none text-muted me-3"><i className="bi bi-pinterest footer-icon"></i></a>
            </div>
          </div>

          <div className="col-md-4 text-md-center">
            <h5 className="fw-bold text-uppercase mb-3 footer-heading">Quick Links</h5>
            <ul className="list-unstyled lh-lg">
              <li><Link to="/" className="text-decoration-none small footer-link">Home Collection</Link></li>
              <li><Link to="/cart" className="text-decoration-none small footer-link">Shopping Bag</Link></li>
              <li><Link to="/login" className="text-decoration-none small footer-link">Customer Account</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold text-uppercase mb-3 footer-heading">Store Information</h5>
            <p className="small mb-2 footer-text"><i className="bi bi-geo-alt-fill me-2 footer-icon-sm"></i> Main Bazaar, Burewala, Pakistan</p>
            <p className="small mb-2 footer-text"><i className="bi bi-telephone-fill me-2 footer-icon-sm"></i> +92 300 1234567</p>
            <p className="small mb-3 footer-text"><i className="bi bi-envelope-fill me-2 footer-icon-sm"></i> info@elmasjewelry.com</p>
            <p className="small border-top pt-2 footer-clock">
              <i className="bi bi-clock-fill me-2 footer-icon-sm"></i>
              <span>{dateText}</span> | <span>{timeText}</span>
            </p>
          </div>
        </div>

        <hr className="mt-4 mb-3 footer-hr" />

        <div className="text-center">
          <p className="mb-0 small text-uppercase footer-copy">
            &copy; 2026 Elmas Jewelry Boutique. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
