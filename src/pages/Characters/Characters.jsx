import './Characters.css'
import Loading from '../../components/Loading/Loading'
import React, { useEffect, useReducer, useState } from 'react'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import Pagination from '../../components/Pagination/Pagination'
import { Link, useNavigate } from 'react-router-dom'

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    case 'REMOVE':
      return state.filter((fav) => fav._id !== action.payload._id)
    case 'INIT':
      return action.payload
    default:
      return state
  }
}

const Characters = () => {
  const navigate = useNavigate()
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    setLoading(true)
    setCharacters([])
    fetch(
      `https://stranger-things-api.fly.dev/api/v1/characters?page=${page}&perPage=10`
    )
      .then((res) => res.json())
      .then((res) => {
        setCharacters(res)
        setLoading(false)
      })
  }, [page])

  const toggleFavorite = (character) => {
    if (favorites.some((fav) => fav._id === character._id)) {
      dispatch({ type: 'REMOVE', payload: character })
    } else {
      dispatch({ type: 'ADD', payload: character })
    }
  }

  return (
    <main className='characters'>
      <nav>
        <Link to='/' className='back-btn'>
          ← Home
        </Link>
      </nav>

      {loading && <Loading />}
      {characters.map((character) => (
        <CharacterCard
          key={character._id}
          character={character}
          isFavorite={favorites.some((fav) => fav._id === character._id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
      <Pagination page={page} setPage={setPage} />
    </main>
  )
}

export default Characters
