import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">V</span>
            <span>Veloura <small>WEDDINGS</small></span>
          </div>
          <p>Elegant wedding products, decor and details curated for unforgettable celebrations.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/about">About us</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Hyderabad, Telangana</p>
          <p>+91 90000 00000</p>
          <p>hello@example.com</p>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} Veloura Weddings. All rights reserved.</div>
    </footer>
  );
}
