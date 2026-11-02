import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks.js";

export default function NotFound() {
  useDocumentTitle("Page Not Found | ELMAS Jewellery");
  return (
    <div className="container text-center" style={{ padding: "100px 0" }}>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <p className="text-muted">This page could not be found.</p>
      <Link to="/" className="btn btn-dark" style={{ borderRadius: 0 }}>Back to Home</Link>
    </div>
  );
}
