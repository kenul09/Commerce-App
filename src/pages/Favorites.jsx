import { useTranslation } from "react-i18next";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { t } = useTranslation();
  const { favorites } = useStore();

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>❤️</span>
            <h2>{t("favorites.empty.title")}</h2>
            <p>{t("favorites.empty.subtitle")}</p>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>
              {t("favorites.title")}
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