import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useDocumentTitle } from "../hooks.js";
import "../styles/pg-login.css";

export default function Login() {
  useDocumentTitle("Login | ELMAS Jewellery");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/collections";
  const notice = location.state?.message || "";
  const timer = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({ user: "", pass: "" });
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = { user: "", pass: "" };
    let valid = true;

    if (email.trim() === "") {
      newErrors.user = "Registered Email context is required";
      valid = false;
    } else if (!email.includes("@")) {
      newErrors.user = "Invalid standard email structure format";
      valid = false;
    }
    if (password.length < 6) {
      newErrors.pass = "Password must be at least 6 characters long";
      valid = false;
    }
    setErrors(newErrors);
    setLoginError("");
    setLoginSuccess("");
    if (!valid) return;

    const result = login(email, password);
    if (result.ok) {
      setLoginSuccess("Login Successful! Welcome back.");
      timer.current = setTimeout(() => navigate(redirectTo, { replace: true }), 1800);
    } else {
      setLoginError(result.error);
    }
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setErrors({ user: "", pass: "" });
    setLoginError("");
  }

  return (
    <div className="pg-login">
      <div className="login-container-section">
        <div className="login-luxury-box">
          <h2>Club Sign In</h2>
          <p className="text-muted small mb-4">Access your personal account dashboard and tracked orders.</p>

          {notice && !loginSuccess && <div className="alert alert-warning small p-2 text-center">{notice}</div>}
          {loginError && <div className="alert alert-danger small p-2 text-center">{loginError}</div>}
          {loginSuccess && <div className="alert alert-success small p-2 text-center">{loginSuccess}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group-custom" style={{ marginTop: 25 }}>
              <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <span className="error">{errors.user}</span>
            </div>

            <div className="input-group-custom">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Secret Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="toggle-pass" onClick={() => setShowPass((s) => !s)}>
                {showPass ? "HIDE" : "SHOW"}
              </span>
              <span className="counter">{password.length} characters</span>
              <span className="error">{errors.pass}</span>
            </div>

            <button type="submit" className="btn-submit-luxury">Sign In to Store</button>
            <button type="button" className="btn-reset-luxury" onClick={clearForm}>Clear Input Fields</button>
          </form>

          <div className="text-center mt-4 pt-2 border-top">
            <Link to="/register" style={{ color: "var(--luxury-gold)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
              New to ELMAS? Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
