import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CharacterCard from '../CharacterCard/CharacterCard'
import './SearchResults.css'
import Loading from '../Loading/Loading'

const SearchResults = () => {
  const { keyword } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://stranger-things-api.fly.dev/api/v1/characters?name=${encodeURIComponent(
            keyword
          )}`
        )
        const data = await response.json()

        if (data.length > 0) {
          setCharacter(data[0])
        } else {
          setCharacter(null)
        }
      } catch (error) {
        console.error('Error fetching character:', error)
        setCharacter(null)
      }
      setLoading(false)
    }

    fetchCharacter()
  }, [keyword])

  const toggleFavorite = (character) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    const isFavorite = storedFavorites.some(
      (char) => char._id === character._id
    )

    let updatedFavorites
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(
        (char) => char._id !== character._id
      )
    } else {
      updatedFavorites = [...storedFavorites, character]
    }

    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(storedFavorites)
  }, [])

  return (
    <div className='result'>
      <button onClick={() => navigate('/')} className='back-btn'>
        ← Home
      </button>
      {loading && <Loading />}
      {character ? (
        <CharacterCard
          character={character}
          isFavorite={favorites.some((char) => char._id === character._id)}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <p>No character found</p>
      )}
    </div>
  )
}

export default SearchResults
