import styles from "./Search.module.css";

const Search = ({ value, onChange }) => (
  <div className={styles.wrapper}>
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <input
      type="text"
      className={styles.input}
      placeholder="Search products…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button className={styles.clear} onClick={() => onChange("")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    )}
  </div>
);

export default Search;
