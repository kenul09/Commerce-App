import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Home.module.css";
import Categories from "../components/Categories/Categories";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const slides = t("home.slides", { returnObjects: true });

  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1400&auto=format&fit=crop",
  ];

  const goTo = (idx) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    const iv = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(iv);
  }, [current, slides.length]);

  const slide = slides[current];
  const image = images[current];

  return (
    <div className={styles.home}>
      <Navbar />

      <section className={styles.hero}>
        <div
          className={`${styles.heroBg} ${transitioning ? styles.heroBgFade : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className={styles.heroBgOverlay} />

        <div className={`${styles.heroContent} ${transitioning ? styles.contentFade : ""}`}>
          <span className={styles.badge}>{slide.badge}</span>

          <h1 key={current} className={styles.heroTitle}>
            <span className={styles.titleLine}>{slide.title}</span>
            <span className={styles.titleAccent}>{slide.accent}</span>
            <span className={styles.titleLine}>{slide.tail}</span>
          </h1>

          <p className={styles.heroSub}>{slide.subtitle}</p>

          <div className={styles.heroActions}>
            <button className={styles.ctaPrimary} onClick={() => navigate("/products")}>
              {slide.button}
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button className={styles.ctaSecondary} onClick={() => navigate("/products")}>
              {t("home.browseAll")}
            </button>
          </div>

          <div className={styles.counter}>
            <span className={styles.counterNum}>{String(current + 1).padStart(2, "0")}</span>
            <div className={styles.counterTrack}>
              <div
                className={styles.counterFill}
                style={{ width: `${((current + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className={`${styles.heroVisual} ${transitioning ? styles.visualFade : ""}`}>
          <div className={styles.visualGlow} />
          <img src={image} alt="" className={styles.visualImg} />
        </div>

        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => goTo((current + 1) % slides.length)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </section>

      <Categories />
    </div>
  );
};

export default Home;