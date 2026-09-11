import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([api.featured(), api.categories()])
      .then(([featured, cats]) => {
        setProducts(featured);
        setCategories(cats);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">WEDDINGS • DECOR • DETAILS</p>
          <h1>Make every moment<br /><em>beautifully yours.</em></h1>
          <p className="hero-text">Explore our curated collection of wedding products, decor and celebration details.</p>
          <Link className="btn btn-primary" to="/products">Explore Products <span>→</span></Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Made for your <em>big day.</em></h2>
            </div>
            <Link className="text-link" to="/products">View all products →</Link>
          </div>

          <div className="category-row">
            {categories.map((cat) => (
              <Link className="category-chip" key={cat.id} to={`/products?category=${cat.id}`}>
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="product-grid">
            {products.length ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            )) : (
              <div className="empty-state">
                <h3>No featured products yet</h3>
                <p>Add products from Django Admin.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="story-banner">
        <div className="container story-content">
          <p className="eyebrow">YOUR DAY. YOUR STYLE.</p>
          <h2>Thoughtful details.<br /><em>Timeless memories.</em></h2>
          <Link className="btn btn-light" to="/about">Our Story</Link>
        </div>
      </section>

      <section className="section">
        <div className="container feature-strip">
          <div><span>01</span><h3>Curated</h3><p>Wedding-ready products selected for beautiful celebrations.</p></div>
          <div><span>02</span><h3>Custom</h3><p>Choose styles, themes and details that match your vision.</p></div>
          <div><span>03</span><h3>Personal</h3><p>Every celebration deserves details that feel uniquely yours.</p></div>
        </div>
      </section>
    </>
  );
}
