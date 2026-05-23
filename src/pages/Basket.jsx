import { useTranslation } from "react-i18next";
import { useStore } from "../context/StoreContext";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Basket.module.css";

const Basket = () => {
  const { t } = useTranslation();
  const { basket, removeFromBasket, updateQuantity, clearBasket, basketTotal } = useStore();

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {basket.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛒</span>
            <h2>{t("basket.empty.title")}</h2>
            <p>{t("basket.empty.subtitle")}</p>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1 className={styles.pageTitle}>
                <span className={styles.pageTitleText}>{t("basket.title")}</span>
                <span className={styles.itemCount}>
                  {t("basket.itemCount", { count: basket.reduce((s, i) => s + i.quantity, 0) })}
                </span>
              </h1>
              <button className={styles.clearBtn} onClick={clearBasket}>{t("basket.clearAll")}</button>
            </div>

            <div className={styles.content}>
              <div className={styles.items}>
                {basket.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemImg}>
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <span className={styles.itemPrice}>${item.price} {t("basket.perUnit")}</span>
                    </div>
                    <div className={styles.controls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >−</button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                    <span className={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</span>
                    <button className={styles.removeBtn} onClick={() => removeFromBasket(item.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>{t("basket.title")}</h2>
                <div className={styles.summaryRow}>
                  <span>{t("basket.subtotal")}</span>
                  <span>${basketTotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>{t("basket.shipping")}</span>
                  <span className={styles.free}>{t("basket.free")}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.summaryTotal}>
                  <span>{t("basket.total")}</span>
                  <span>${basketTotal.toFixed(2)}</span>
                </div>
                <button className={styles.checkoutBtn}>
                  {t("basket.checkout")}
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Basket;