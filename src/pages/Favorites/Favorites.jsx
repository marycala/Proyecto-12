import React, { useReducer, useEffect } from 'react'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import './Favorites.css'
import { useNavigate } from 'react-router-dom'
import useFavorites from '../../hooks/useFavorites'

const Favorites = () => {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <main className='favorites'>
      <button onClick={() => navigate('/')} className='back-btn'>
        ← Home
      </button>
      <h2>My Favorites Characters</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className='favorites-grid'>
          {favorites.map((character, index) => (
            <CharacterCard
              key={character._id ? String(character._id) : `char-${index}`}
              character={character}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Favorites
