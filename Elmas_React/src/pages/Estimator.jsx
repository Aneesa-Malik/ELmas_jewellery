import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useDocumentTitle } from "../hooks.js";
import "../styles/pg-estimator.css";

const DEFAULT_OPTIONS = [
  { id: "G1", name: "Gold Ring", price: 55000 },
  { id: "D1", name: "Diamond Bridal Set", price: 180000 },
  { id: "N1", name: "Luxury Necklace", price: 95000 },
  { id: "B1", name: "Designer Bracelet", price: 45000 },
  { id: "E1", name: "Gold Earrings", price: 35000 },
];

export default function Estimator() {
  useDocumentTitle("Price Estimator | ELMAS Jewellery");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Item forwarded from the Collections page (?id=..&name=..&price=..)
  const passedName = params.get("name") || "";
  const passedPrice = parseFloat(params.get("price")) || 0;
  const passedId = params.get("id") || "";

  const options = useMemo(() => {
    const list = [...DEFAULT_OPTIONS];
    if (passedName && passedPrice > 0) {
      list.unshift({ id: passedId || "999", name: passedName, price: passedPrice });
    }
    return list;
  }, [passedName, passedPrice, passedId]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState("1");
  const [total, setTotal] = useState(0);
  const [canAdd, setCanAdd] = useState(false);

  const selected = options[selectedIndex] || options[0];

  function calculateTotal() {
    const quantity = parseInt(qty, 10);
    if (isNaN(quantity) || quantity < 1) {
      setTotal(0);
      setCanAdd(false);
      return;
    }
    setTotal(selected.price * quantity);
    setCanAdd(true);
  }

  // Recalculate whenever the selection or quantity changes
  useEffect(calculateTotal, [selectedIndex, qty, options]); // eslint-disable-line react-hooks/exhaustive-deps

  function addToBag() {
    addItem(selected.id, selected.name, selected.price, parseInt(qty, 10));
    navigate("/cart");
  }

  return (
    <div className="pg-estimator">
      <div className="calc-container">
        <div className="calc-box">
          <h2>Cost Estimator</h2>
          <p className="text-muted small mb-1">Calculate instant base quotations for premium materials.</p>

          <label>Select Master Item Type</label>
          <select value={selectedIndex} onChange={(e) => setSelectedIndex(Number(e.target.value))}>
            {options.map((o, i) => (
              <option key={`${o.id}-${i}`} value={i}>
                {i === 0 && passedName && passedPrice > 0
                  ? `${o.name} (Rs. ${o.price.toLocaleString("en-US")})`
                  : `${o.name} (Starting Rs. ${o.price.toLocaleString("en-US")})`}
              </option>
            ))}
          </select>

          <label>Required Quantity</label>
          <input type="number" value={qty} min="1" onChange={(e) => setQty(e.target.value)} />

          <button type="button" className="btn-calc" onClick={calculateTotal}>
            Calculate Total Cost
          </button>

          <a
            className="btn-add-cart-dynamic"
            style={{ display: canAdd ? "block" : "none" }}
            href="#add"
            onClick={(e) => {
              e.preventDefault();
              addToBag();
            }}
          >
            Add Selection to Shopping Bag
          </a>

          <div id="resultArea">
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8", fontWeight: 600 }}>
              Estimated Valuation
            </span>
            <span id="totalPrice">Rs. {total.toLocaleString("en-US")}</span>
          </div>

          <div className="border-top mt-4 pt-2">
            <Link to="/collections" className="back-link">← Return to Store Gallery</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
