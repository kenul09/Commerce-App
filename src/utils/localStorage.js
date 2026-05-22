// Basket
export const getBasket = () => {
  try {
    return JSON.parse(localStorage.getItem("basket")) || [];
  } catch {
    return [];
  }
};

export const saveBasket = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

// Favorites
export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
