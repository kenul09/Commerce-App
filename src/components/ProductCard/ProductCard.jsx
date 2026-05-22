import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToBasket, toggleFavorite, isFavorite } = useStore();
  const fav = isFavorite(product.id);

  return (
    <div className={styles.card}>
      <div className={styles.cardGlow}></div>

      <div className={styles.imageWrap} onClick={() => navigate(`/products/${product.id}`)}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" className={styles.img} />
        <div className={styles.imageOverlay} />

        <div className={styles.particles}>
          <span></span><span></span><span></span>
        </div>

        <button
          className={`${styles.favBtn} ${fav ? styles.favActive : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
        >
          <svg className={styles.icon} viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        <span className={styles.categoryPill}>{product.category}</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.desc}>{product.description}</p>

        <div className={styles.footer}>
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            <span className={styles.rating}>★ {product.rating}</span>
          </div>

          <div className={styles.actions}>
            <button className={styles.btnCart} onClick={() => addToBasket(product)} title="Add to basket">
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </button>

            <button className={styles.btnDetails} onClick={() => navigate(`/products/${product.id}`)}>
              <span>details</span>
              <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
