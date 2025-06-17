import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Characters from './pages/Characters/Characters'
import Character from './pages/Character/Character'
import SearchResults from './components/SearchResults/SearchResults'
import Favorites from './pages/Favorites/Favorites'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/characters/:id' element={<Character />} />
        <Route path='/search/:keyword' element={<SearchResults />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App
