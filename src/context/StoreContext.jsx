import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getBasket,
  saveBasket,
  getFavorites,
  saveFavorites,
} from "../utils/localStorage";
import { getProducts } from "../Service/api";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => getBasket());
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    getProducts(100).then((data) => {
      const unique = ["all", ...new Set(data.products.map((p) => p.category))];
      setCategories(unique);
    });
  }, []);

  useEffect(() => { saveBasket(basket); }, [basket]);
  useEffect(() => { saveFavorites(favorites); }, [favorites]);

  const addToBasket = (product) => {
    setBasket((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) { removeFromBasket(id); return; }
    setBasket((prev) =>
      prev.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearBasket = () => setBasket([]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const basketTotal = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      basket,
      favorites,
      categories,
      activeCategory,
      setActiveCategory,
      addToBasket,
      removeFromBasket,
      updateQuantity,
      clearBasket,
      toggleFavorite,
      isFavorite,
      basketTotal,
      basketCount,
    }),
    [basket, favorites, categories, activeCategory, basketTotal, basketCount]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};