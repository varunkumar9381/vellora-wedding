import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.categories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.products({ q: searchParams.get("q") || "", category: searchParams.get("category") || "" })
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchParams]);

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (q.trim()) next.q = q.trim();
    if (category) next.category = category;
    setSearchParams(next);
  }

  function clear() {
    setQ("");
    setCategory("");
    setSearchParams({});
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">THE COLLECTION</p>
          <h1>Wedding <em>Products</em></h1>
          <p>Browse our wedding products and discover details for your celebration.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="filter-bar" onSubmit={submit}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All categories</option>
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <button className="btn btn-dark" type="submit">Search</button>
            {(q || category) && <button className="clear-filter" type="button" onClick={clear}>Clear</button>}
          </form>

          <div className="results-count">{loading ? "Loading..." : `${products.length} product${products.length === 1 ? "" : "s"}`}</div>

          <div className="product-grid">
            {!loading && products.map((product) => <ProductCard key={product.id} product={product} />)}
            {!loading && !products.length && (
              <div className="empty-state"><h3>No products found</h3><p>Try another search or category.</p></div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
