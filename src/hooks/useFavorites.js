import { useReducer, useEffect, useCallback } from 'react';

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return state.some((char) => char._id === action.payload._id)
        ? state
        : [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter((char) => char._id !== action.payload);
    default:
      return state;
  }
};

const init = () => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
};

const useFavorites = () => {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], init);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback(
    (character) => {
      const isFav = favorites.some((fav) => fav._id === character._id);
      dispatch({
        type: isFav ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE',
        payload: isFav ? character._id : character
      });
    },
    [favorites]
  );
  
  return { favorites, toggleFavorite };
};

export default useFavorites;