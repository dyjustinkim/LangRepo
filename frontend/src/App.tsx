import { useState } from 'react'
import './index.css'
import { Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import DeckList from './components/Decks'
import Profile from './views/Profile'
import Login from './views/Login'
import AuthGate from './views/AuthGate'
import Register from './views/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/authgate" element={<AuthGate />} />
    </Routes>

  )
}

export default App
