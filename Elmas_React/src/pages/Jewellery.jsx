import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jewelleryProducts } from "../data/jewellery.js";
import { useCart } from "../context/CartContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { load } from "../context/storage.js";
import { useDocumentTitle, formatRs, SORT_OPTIONS, sortItems } from "../hooks.js";
import "../styles/pg-jewellery.css";

export default function Jewellery() {
  useDocumentTitle("Jewellery Collection | ELMAS");
  const { addItem } = useCart();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  // Search bar se aaye huye naam (?q=...) ko search box mein laga do
  const urlSearch = params.get("q");
  useEffect(() => {
    if (urlSearch) setQuery(urlSearch);
  }, [urlSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  // Products added by the admin page (replaces INSERT INTO products)
  const products = useMemo(() => {
    const custom = load("elmas_custom_products", []);
    return [...jewelleryProducts, ...custom];
  }, []);

  const term = query.toLowerCase().trim();
  const visible = sortItems(
    products.filter((p) => p.name.toLowerCase().includes(term)),
    sortBy,
    "name"
  );

  function addToBag() {
    if (!selected) return;
    addItem(selected.id, selected.name, selected.price, 1);
    navigate("/cart");
  }

  return (
    <div className="pg-jewellery">
      <div className="gallery-container">
        <h1>Our Exquisite Collection</h1>
        <select
          className="form-select"
          style={{ maxWidth: 260, margin: "0 auto 30px" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div className="gallery">
          {visible.map((p) => (
            <div className="item" key={p.id} onClick={() => setSelected(p)}>
              <img src={p.image} alt={p.name} loading="lazy" />
              <p>{p.name}</p>
              <p className="price">{formatRs(p.price)}</p>
            </div>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="text-muted mt-4">No pieces match your search.</p>
        )}
      </div>

      {selected && (
        <div
          className="elmas-modal"
          style={{ display: "flex" }}
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="elmas-modal-content">
            <span className="close-btn" onClick={() => setSelected(null)}>&times;</span>
            <img src={selected.image} alt={selected.name} />
            <h2>{selected.name}</h2>
            <p className="price">{formatRs(selected.price)}</p>
            <button className="buy-btn" onClick={addToBag}>Add To Shopping Bag</button>
          </div>
        </div>
      )}
    </div>
  );
}
