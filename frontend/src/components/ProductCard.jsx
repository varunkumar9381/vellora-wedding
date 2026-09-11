import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.slug}`} className="product-image">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} />
        ) : (
          <div className="image-placeholder"><span>V</span></div>
        )}
        {product.featured && <span className="badge">Featured</span>}
      </Link>
      <div className="product-info">
        <p className="product-category">{product.category_name || "Wedding Collection"}</p>
        <h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.short_description}</p>
        <div className="product-bottom">
          {product.price !== null && product.price !== undefined && (
            <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
          )}
          <Link to={`/products/${product.slug}`}>View details →</Link>
        </div>
      </div>
    </article>
  );
}
