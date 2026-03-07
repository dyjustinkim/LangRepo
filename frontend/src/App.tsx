import { useState } from 'react'
import './index.css'
import { Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import DeckList from './components/Decks'
import Projects from './views/ProjectView'
import Login from './views/Login'
import AuthGate from './views/AuthGate'
import Register from './views/Register'
import Decks from './views/DeckView'

function App() {

  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:username" element={<Projects />} />
      <Route path="/register" element={<Register />} />
      <Route path="/authgate" element={<AuthGate />} />
      <Route path="/:username/:project" element={<Decks />} />
    </Routes>

  )
}

export default App
