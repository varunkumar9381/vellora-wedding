const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || data.message || "Request failed");
  return data;
}

export const api = {
  products: (params = {}) => {
    const search = new URLSearchParams();
    if (params.q) search.set("q", params.q);
    if (params.category) search.set("category", params.category);
    const query = search.toString();
    return request(`/products/${query ? `?${query}` : ""}`);
  },
  featured: () => request("/products/featured/"),
  product: (slug) => request(`/products/${slug}/`),
  categories: () => request("/categories/"),
  contact: (body) => request("/contact/", {
    method: "POST",
    body: JSON.stringify(body),
  }),
};
