import { useReducer, useEffect } from 'react';

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];
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

  const toggleFavorite = (character) => {
    dispatch({
      type: favorites.some((fav) => fav._id === character._id)
        ? 'REMOVE_FAVORITE'
        : 'ADD_FAVORITE',
      payload: character,
    });
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;