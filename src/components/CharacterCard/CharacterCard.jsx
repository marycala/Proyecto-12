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
      <article
        className='character-card'
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick()
          }
        }}
        aria-label={`View details for ${character.name}`}
      >
        <figure className='img-wrp'>
          <img src={character.photo} alt={character.name} />
          <figcaption className='cortina'>
            <h2>{character.name}</h2>
          </figcaption>
        </figure>

        <section className='favorite'>
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              toggleFavorite(character)
            }}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`}
          >
            {isFavorite ? '★ Remove' : '☆ Add to Favorites'}
          </button>
        </section>
      </article>
    )
  )
})

export default CharacterCard
