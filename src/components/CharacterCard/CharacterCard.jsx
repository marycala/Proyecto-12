import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import './CharacterCard.css'

const CharacterCard = memo(({ character, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/characters/${character._id}`)
  }

  return (
    character.photo && (
      <div
        className='character-card'
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className='cortina'>
          <h2>{character.name}</h2>
        </div>
        <div className='img-wrp'>
          <img src={character.photo} alt={character.name} />
        </div>
        <div className='favorite'>
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              toggleFavorite(character)
            }}
          >
            {isFavorite ? '★ Remove' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    )
  )
})

export default CharacterCard
