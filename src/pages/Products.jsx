import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../Service/api";
import Navbar from "../components/Navbar/Navbar";
import ProductCard from "../components/ProductCard/ProductCard";
import Search from "../components/Search/Search";
import Sort from "../components/Sort/Sort";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProducts(100);
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleReset = () => { setSearch(""); setSort(""); };

  const filtered = useMemo(() => {
    let r = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":   r.sort((a, b) => a.price - b.price); break;
      case "price-desc":  r.sort((a, b) => b.price - a.price); break;
      case "rating-desc": r.sort((a, b) => b.rating - a.rating); break;
      case "name-asc":    r.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return r;
  }, [products, search, sort]);

  return (
    <div className={styles.page}>
      <div className={styles.blobField} />
      <Navbar />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Products</h1>
            <p className={styles.pageCount}>{filtered.length} items found</p>
          </div>
          <div className={styles.toolbar}>
            <Search value={search} onChange={setSearch} />
            <Sort value={sort} onChange={setSort} onReset={handleReset} />
          </div>
        </div>

        {loading && (
          <div className={styles.stateWrap}>
            <div className={styles.spinner} />
            <p>Loading products…</p>
          </div>
        )}
        {error && (
          <div className={styles.stateWrap} style={{ color: "#f43f5e" }}>
            Error: {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className={styles.stateWrap}>
            <span style={{ fontSize: "3rem" }}>🔍</span>
            <p>No products found. Try a different search.</p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
