import { useState } from 'react'
import './index.css'
import { Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import DeckList from './components/Decks'
import Profile from './views/ProfileView'
import Login from './views/Login'
import AuthGate from './views/AuthGate'
import Register from './views/Register'
import Projects from './views/ProjectView'
import Decks from './views/DeckView';
import Account from './views/Account';
import PrivateRoutes from './components/PrivateRoute';
import Docs from './views/DocView';

function App() {

  return (
    <Routes>
      <Route element={<PrivateRoutes/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authgate" element={<AuthGate />} />
          <Route path="/profile/:project" element={<Projects />} />
          <Route path="/profile/:project/docs/:doc" element={<Docs />} />
          <Route path="/profile/:project/decks/:deck" element={<Decks />} />
          <Route path="/profile/account" element={<Account />} />
              
        </Route>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
    </Routes>

  )
}

export default App
