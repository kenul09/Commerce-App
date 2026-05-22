import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { favorites } = useStore();

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>❤️</span>
            <h2>No favorites yet</h2>
            <p>Click the heart icon on any product to save it here</p>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>
              My Favorites
              <span className={styles.count}>{favorites.length}</span>
            </h1>
            <div className={styles.grid}>
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Favorites;
