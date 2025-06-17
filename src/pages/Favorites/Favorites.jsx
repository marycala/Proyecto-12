import React from 'react'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import './Favorites.css'
import { Link } from 'react-router-dom'
import useFavorites from '../../hooks/useFavorites'

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <main className='favorites'>
      <nav>
        <Link to='/' className='back-btn' aria-label='Go back home'>
          ← Home
        </Link>
      </nav>
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
