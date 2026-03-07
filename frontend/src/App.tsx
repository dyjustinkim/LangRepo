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
import Flashcards from './views/FlashcardView';
import Account from './views/Account';
import PrivateRoutes from './components/PrivateRoute';


function App() {

  return (
    <Routes>
      <Route element={<PrivateRoutes/>}>
          <Route path="/:username" element={<Projects />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authgate" element={<AuthGate />} />
          <Route path="/:username/:project" element={<Decks />} />
          <Route path="/:username/:project/:deck" element={<Flashcards />} />
          <Route path="/:username/account" element={<Account />} />
              
        </Route>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
    </Routes>

  )
}

export default App
