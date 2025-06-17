import './Characters.css'
import Loading from '../../components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import Pagination from '../../components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'

const Characters = () => {
  const navigate = useNavigate()
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

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
    let updatedFavorites
    if (favorites.some((fav) => fav._id === character._id)) {
      updatedFavorites = favorites.filter((fav) => fav._id !== character._id)
    } else {
      updatedFavorites = [...favorites, character]
    }
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <main className='characters'>
      <button onClick={() => navigate('/')} className='back-btn'>
        ← Home
      </button>

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
