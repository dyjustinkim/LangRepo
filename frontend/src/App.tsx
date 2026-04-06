import './index.css'
import { Routes, Route } from "react-router-dom";
import Profile from './views/ProfileView'
import Login from './views/Login'
import AuthGate from './views/AuthGate'
import Register from './views/Register'
import Projects from './views/ProjectView'
import Decks from './views/DeckView';
import FlashcardViewer from './views/FlashcardView';
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
          <Route path="/profile/:project/docs/:doc_id" element={<Docs />} />
          <Route path="/profile/:project/decks/:deck_id/edit" element={<Decks />} />
          <Route path="/profile/:project/decks/:deck_id/study" element={<FlashcardViewer />} />
          <Route path="/profile/account" element={<Account />} />
              
        </Route>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
    </Routes>

  )
}

export default App
