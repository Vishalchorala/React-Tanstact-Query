import React from 'react'
import FetchPosts from './components/FetchPosts'
import PaginatedPosts from './components/PaginatedPosts'
import InfinitePosts from './components/InfinitePosts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {

  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
