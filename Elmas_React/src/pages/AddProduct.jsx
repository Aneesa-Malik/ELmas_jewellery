import { useState } from "react";
import { Link } from "react-router-dom";
import { jewelleryProducts } from "../data/jewellery.js";
import { load, save } from "../context/storage.js";
import { useDocumentTitle, formatRs, SORT_OPTIONS, sortItems } from "../hooks.js";

const CATEGORIES = ["Diamond Necklace", "Gold Necklace", "Gold Bracelet", "Diamond Bracelet", "Diamond Ring", "Gold Earring"];

// Equivalent of add_product.php / admin/ADMIN_logo.php (INSERT INTO products)
export default function AddProduct() {
  useDocumentTitle("Add Product | ELMAS Admin");
  const [form, setForm] = useState({ name: "", price: "", category: CATEGORIES[0] });
  const [message, setMessage] = useState("");
  const [custom, setCustom] = useState(() => load("elmas_custom_products", []));
  const [sortBy, setSortBy] = useState("default");
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    const nextId = Math.max(0, ...jewelleryProducts.map((p) => p.id), ...custom.map((p) => p.id)) + 1;
    const product = {
      id: nextId,
      name: form.name.trim() || form.category,
      price: Number(form.price),
      category: form.category,
      image: "/picss/picss.jpg",
    };
    const updated = [...custom, product];
    save("elmas_custom_products", updated);
    setCustom(updated);
    setMessage("Product Added Successfully!");
    setForm({ name: "", price: "", category: CATEGORIES[0] });
  }

  return (
    <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
      <h2 style={{ textAlign: "center" }}>Add New Product</h2>
      {message && (
        <div className="alert alert-success text-center" style={{ maxWidth: 500, margin: "20px auto" }}>
          {message} <Link to="/jewellery">View in Jewellery page</Link>
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" required value={form.name} onChange={update("name")} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" min="1" className="form-control" required value={form.price} onChange={update("price")} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={update("category")}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-dark w-100" style={{ borderRadius: 0 }}>Save Product</button>
      </form>

      <div style={{ maxWidth: 800, margin: "50px auto 0" }}>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h4 className="m-0">All Products</h4>
          <select
            className="form-select"
            style={{ maxWidth: 240 }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle bg-white">
            <thead>
              <tr><th>#</th><th>Name</th><th className="text-end">Price</th></tr>
            </thead>
            <tbody>
              {sortItems([...jewelleryProducts, ...custom], sortBy, "name").map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td className="text-end">{formatRs(p.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
