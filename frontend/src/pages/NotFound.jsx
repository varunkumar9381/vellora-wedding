import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state">
        <p className="eyebrow">404</p>
        <h2>Page not found</h2>
        <Link className="btn btn-primary" to="/">Go Home</Link>
      </div>
    </section>
  );
}
