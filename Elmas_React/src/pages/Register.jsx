import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useDocumentTitle } from "../hooks.js";
import "../styles/pg-register.css";

const EMPTY = { firstname: "", lastname: "", phone: "", email: "" };

export default function Register() {
  useDocumentTitle("Create Account | ELMAS Jewellery");
  const { register } = useAuth();
  const navigate = useNavigate();
  const timer = useRef(null);

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [dbError, setDbError] = useState("");
  const [dbSuccess, setDbSuccess] = useState("");

  useEffect(() => () => clearTimeout(timer.current), []);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (form.firstname.trim().length < 3) newErrors.firstname = "Minimum 3 characters required";
    if (form.phone.trim().length < 11) newErrors.phone = "Enter a valid 11-digit mobile number";
    if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.email = "Invalid luxury email path architecture";
    }
    setErrors(newErrors);
    setDbError("");
    setDbSuccess("");
    if (Object.keys(newErrors).length > 0) return;

    const result = register({
      firstName: form.firstname,
      lastName: form.lastname,
      phone: form.phone,
      email: form.email,
    });
    if (result.ok) {
      setDbSuccess("Registration complete! Redirecting to login...");
      timer.current = setTimeout(() => navigate("/login"), 2000);
    } else {
      setDbError(result.error);
    }
  }

  function clearForm() {
    setForm(EMPTY);
    setErrors({});
    setDbError("");
  }

  return (
    <div className="pg-register">
      <div className="register-container">
        <div className="register-luxury-box">
          <h2>Create Account</h2>
          <p className="text-muted small mb-4">Join ELMAS Privilege Club to track and place luxury orders.</p>

          {dbError && <div className="alert alert-danger small p-2">{dbError}</div>}
          {dbSuccess && <div className="alert alert-success small p-2">{dbSuccess}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group-custom" style={{ marginTop: 25 }}>
              <span className="counter">{form.firstname.length} chars</span>
              <input type="text" placeholder="First Name" value={form.firstname} onChange={update("firstname")} />
              <p className="error">{errors.firstname}</p>
            </div>

            <div className="form-group-custom">
              <input type="text" placeholder="Last Name" value={form.lastname} onChange={update("lastname")} />
              <p className="error">{errors.lastname}</p>
            </div>

            <div className="form-group-custom">
              <input type="text" placeholder="Phone Number (e.g. 03001234567)" value={form.phone} onChange={update("phone")} />
              <p className="error">{errors.phone}</p>
            </div>

            <div className="form-group-custom">
              <input type="text" placeholder="Email Address" value={form.email} onChange={update("email")} />
              <p className="error">{errors.email}</p>
            </div>

            <button type="submit" className="btn-submit-luxury">Register Account</button>
            <button type="button" className="btn-reset-luxury" onClick={clearForm}>Reset Input Fields</button>
          </form>

          <div className="text-center mt-4 pt-2 border-top">
            <Link to="/login" style={{ color: "var(--luxury-gold)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>
              Already a club member? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
