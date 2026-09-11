import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.product(slug)
      .then((p) => {
        setProduct(p);
        api.products({ category: p.category })
          .then((items) => setRelated(items.filter((x) => x.id !== p.id).slice(0, 4)));
      })
      .catch(() => setError("Product not found."));
  }, [slug]);

  if (error) return <section className="section"><div className="container empty-state"><h2>{error}</h2><Link className="btn btn-primary" to="/products">Back to Products</Link></div></section>;
  if (!product) return <section className="section"><div className="container">Loading...</div></section>;

  return (
    <>
      <section className="section product-detail">
        <div className="container detail-grid">
          <div className="detail-image">
            {product.image_url ? <img src={product.image_url} alt={product.name} /> : <div className="image-placeholder large"><span>V</span></div>}
          </div>
          <div className="detail-copy">
            <p className="eyebrow">{product.category_name || "WEDDING COLLECTION"}</p>
            <h1>{product.name}</h1>
            <p className="lead">{product.short_description}</p>
            {product.price !== null && <div className="detail-price">₹{Number(product.price).toLocaleString("en-IN")}</div>}
            <div className="description"><p>{product.description}</p></div>
            {product.feature_list?.length > 0 && (
              <>
                <h3>Details</h3>
                <ul className="feature-list">{product.feature_list.map((f, i) => <li key={i}>{f}</li>)}</ul>
              </>
            )}
            <Link className="btn btn-primary" to="/contact">Enquire about this product →</Link>
            <p className="no-sales">Showcase only • No online sales or checkout</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related-section">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow">YOU MAY ALSO LIKE</p><h2>More from the <em>collection.</em></h2></div></div>
            <div className="product-grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
