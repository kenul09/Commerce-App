import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { useTranslation } from "react-i18next";
import styles from "./Categories.module.css";

const Categories = () => {
  const { t } = useTranslation();

  const categoryMeta = {
    smartphones: {
      icon: "📱",
      label: t("categories.smartphones"),
    },

    laptops: {
      icon: "💻",
      label: t("categories.laptops"),
    },

    tablets: {
      icon: "📟",
      label: t("categories.tablets"),
    },

    "mobile-accessories": {
      icon: "🔌",
      label: t("categories.accessories"),
    },

    "mens-watches": {
      icon: "⌚",
      label: t("categories.mensWatches"),
    },

    "womens-watches": {
      icon: "⌚",
      label: t("categories.womensWatches"),
    },

    "mens-shoes": {
      icon: "👟",
      label: t("categories.mensShoes"),
    },

    "womens-shoes": {
      icon: "👠",
      label: t("categories.womensShoes"),
    },

    "mens-shirts": {
      icon: "👕",
      label: t("categories.mensClothes"),
    },

    "womens-dresses": {
      icon: "👗",
      label: t("categories.womensClothes"),
    },

    "womens-bags": {
      icon: "👜",
      label: t("categories.bags"),
    },

    "womens-jewellery": {
      icon: "💍",
      label: t("categories.jewellery"),
    },

    sunglasses: {
      icon: "🕶️",
      label: t("categories.glasses"),
    },

    tops: {
      icon: "🧥",
      label: t("categories.tops"),
    },

    fragrances: {
      icon: "🌸",
      label: t("categories.fragrances"),
    },

    skincare: {
      icon: "🧴",
      label: t("categories.skincare"),
    },

    beauty: {
      icon: "💄",
      label: t("categories.beauty"),
    },

    "home-decoration": {
      icon: "🛋️",
      label: t("categories.homeDecoration"),
    },

    furniture: {
      icon: "🪑",
      label: t("categories.furniture"),
    },

    "kitchen-accessories": {
      icon: "🍳",
      label: t("categories.kitchen"),
    },

    groceries: {
      icon: "🛒",
      label: t("categories.groceries"),
    },

    "sports-accessories": {
      icon: "⚽",
      label: t("categories.sports"),
    },

    vehicle: {
      icon: "🚗",
      label: t("categories.vehicle"),
    },

    motorcycle: {
      icon: "🏍️",
      label: t("categories.motorcycle"),
    },

    lighting: {
      icon: "💡",
      label: t("categories.lighting"),
    },
  };

  const trackRef = useRef(null);

  const navigate = useNavigate();

  const { setActiveCategory } = useStore();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((r) => r.json())
      .then((data) => {
        const list = data.map((cat) => {
          const slug = typeof cat === "string"
            ? cat
            : cat.slug;

          const meta = categoryMeta[slug] || {
            icon: "📦",
            label: slug,
          };

          return {
            slug,
            icon: meta.icon,
            label: meta.label,
          };
        });

        setCategories(list);
      })
      .catch(console.error);
  }, [t]);

  const scroll = (dir) => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: dir * 220,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);

    navigate("/products");
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {t("categories.title")}
        </h2>

        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            onClick={() => scroll(-1)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="18"
              height="18"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className={styles.arrow}
            onClick={() => scroll(1)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="18"
              height="18"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={styles.track}
        ref={trackRef}
      >
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={styles.card}
            onClick={() =>
              handleCategoryClick(cat.slug)
            }
          >
            <span className={styles.icon}>
              {cat.icon}
            </span>

            <span className={styles.name}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;