import { NavLink } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { basketCount, favorites } = useStore();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        <span className={styles.brandIcon}>✦</span>
        <span className={styles.brandText}>Commerce</span>
      </NavLink>

      <div className={styles.links}>
        {[
          { to: "/", label: "Home" },
          { to: "/products", label: "Products" },
          { to: "/favorites", label: "Favorites" },
          { to: "/basket", label: "Basket" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className={styles.icons}>
        <NavLink to="/basket" className={styles.iconBtn}>
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {basketCount > 0 && <span className={styles.badge}>{basketCount}</span>}
        </NavLink>

        <NavLink to="/favorites" className={styles.iconBtn}>
          <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
