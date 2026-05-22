const BASE_URL = "https://dummyjson.com";

export const getProducts = async (limit = 100, skip = 0) => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const searchProducts = async (query) => {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}`);
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
};
