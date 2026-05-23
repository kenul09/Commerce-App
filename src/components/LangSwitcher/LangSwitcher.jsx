import { useTranslation } from "react-i18next";
import styles from "./LangSwitcher.module.css";

const LANGS = [
  { code: "az", label: "AZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language?.split("-")[0];

  return (
    <div className={styles.switcher}>
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={`${styles.btn} ${currentLang === code ? styles.active : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;