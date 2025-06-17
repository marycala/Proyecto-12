import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Header.css'

const Header = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()

  const onSubmit = ({ keyword }) => {
    if (keyword.trim() !== '') {
      navigate(`/search/${encodeURIComponent(keyword)}`)
      reset()
    }
  }

  return (
    <header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('keyword')}
          placeholder='Search by name'
          type='text'
        />
        <button type='submit'>🔍</button>
      </form>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/characters'>Characters</NavLink>
          </li>
          <li>
            <NavLink to='/favorites'>Favorites</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
