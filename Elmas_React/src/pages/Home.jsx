import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks.js";
import "../styles/pg-home.css";

const FEATURES = [
  { icon: "bi-gem", title: "Earrings", text: "Premium quality gold and silver craftsmanship curated meticulously for you." },
  { icon: "bi-gift", title: "Diamond Sets", text: "Luxury high-clarity stones tailored exclusively to crown your special moments." },
  { icon: "bi-activity", title: "Bracelets", text: "Exquisite fine-carve designs perfectly made to embrace your elegant wrist." },
];

export default function Home() {
  useDocumentTitle("ELMAS Jewellery | Luxury Collection");

  return (
    <div className="pg-home">
      <div className="hero">
        <h1>ELMAS Jewellery</h1>
        <p>Timeless Elegance in Every Detail</p>
        <Link to="/jewellery" className="btn-luxury">Explore Collection</Link>
      </div>

      <div className="features-section">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {FEATURES.map((f) => (
              <div className="col-md-4 col-sm-6" key={f.title}>
                <div className="feature-card">
                  <div className="feature-card-icon"><i className={`bi ${f.icon}`}></i></div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
