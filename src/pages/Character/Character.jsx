import './Character.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Character = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://stranger-things-api.fly.dev/api/v1/characters/${id}`)
      .then((res) => res.json())
      .then((res) => setCharacter(res))
  }, [])

  return (
    <main className='character'>
      <nav>
        <Link to='/' className='back-btn' aria-label='Go back home'>
          ← Home
        </Link>
      </nav>
      <h2>{character?.name}</h2>
      <div>
        <img src={character?.photo} alt={character?.name} />
      </div>
      <p>{character?.occupation}</p>
      <p>{character?.portrayedBy}</p>
    </main>
  )
}

export default Character
