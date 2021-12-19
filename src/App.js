import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import TodoIndex from './components/todos/TodoIndex'
import TodoDetail from './components/todos/TodoDetail'
import SavedForLaterIndex from './components/todos/SavedForLaterIndex'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="my-list/todos/:todoId" element={<TodoDetail />} />
        <Route path="/my-list/saved" element={<SavedForLaterIndex />} />
        <Route path="my-list" element={<TodoIndex />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
