import styles from "./Sort.module.css";

const Sort = ({ value, onChange, onReset }) => (
  <div className={styles.wrapper}>
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Sort by…</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="rating-desc">Top Rated</option>
      <option value="name-asc">Name A–Z</option>
    </select>
    {value && (
      <button className={styles.reset} onClick={onReset} title="Reset">✕</button>
    )}
  </div>
);

export default Sort;
