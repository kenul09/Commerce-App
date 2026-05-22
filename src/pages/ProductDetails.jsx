import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../Service/api";
import { useStore } from "../context/StoreContext";
import Navbar from "../components/Navbar/Navbar";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToBasket, toggleFavorite, isFavorite } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <><Navbar /><div className={styles.state}>Loading…</div></>;
  if (error)   return <><Navbar /><div className={`${styles.state} ${styles.err}`}>Error: {error}</div></>;
  if (!product) return null;

  const fav = isFavorite(product.id);
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>

        <div className={styles.content}>
          <div className={styles.gallery}>
            <div className={styles.mainWrap}>
              <div className={styles.mainGlow} />
              <img src={images[activeImg]} alt={product.title} className={styles.mainImg} />
            </div>
            {images.length > 1 && (
              <div className={styles.thumbs}>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ""}`}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.info}>
            <span className={styles.cat}>{product.category}</span>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.desc}>{product.description}</p>

            <div className={styles.stats}>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.rating}>★ {product.rating}</span>
              <span className={styles.stock}>Stock: {product.stock}</span>
            </div>

            {product.discountPercentage > 0 && (
              <div className={styles.discount}>
                🏷 {product.discountPercentage.toFixed(1)}% discount applied
              </div>
            )}

            <div className={styles.actions}>
              <button className={styles.btnBasket} onClick={() => addToBasket(product)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                Add to Basket
              </button>
              <button
                className={`${styles.btnFav} ${fav ? styles.btnFavActive : ""}`}
                onClick={() => toggleFavorite(product)}
              >
                {fav ? "❤️" : "🤍"}
              </button>
            </div>

            {product.tags?.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
