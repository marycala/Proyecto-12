import { useCallback } from 'react'
import useLocalStorage from './useLocalStorage'

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload]
    case 'REMOVE_FAVORITE':
      return state.filter((char) => char._id !== action.payload)
    default:
      return state
  }
}

const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  const dispatch = useCallback(
    (action) => {
      setFavorites((prevState) => favoritesReducer(prevState, action))
    },
    [setFavorites]
  )

  const toggleFavorite = useCallback(
    (character) => {
      dispatch({
        type: favorites.some((fav) => fav._id === character._id)
          ? 'REMOVE_FAVORITE'
          : 'ADD_FAVORITE',
        payload: character._id
      })
    },
    [favorites, dispatch]
  )

  return { favorites, toggleFavorite }
}

export default useFavorites
