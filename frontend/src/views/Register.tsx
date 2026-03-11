import DeckList from '../components/Decks'
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import AddItem from '../components/AddItem';
import authApi from '../api/apiClient';
import {useNavigate, Navigate } from 'react-router-dom';



export default function Register() {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const addUsername = async (username: string) => {
        try {
          await authApi.post('/users', {username: username, user_id: " "}, getAccessTokenSilently);
          // user_id handled by backend
        } catch (error) {
          console.error("Error adding Username", error);
        }
        navigate(`/profile`, { replace: true });
      };

    return (
    
    <>
        <div>
          </div>
          <h1>LangRepo Prototype!!</h1>
          <h1> Welcome, new user!</h1>
          <h1> Choose your username:</h1>
          <div className="card">
            <AddItem label = "new User" onSuccess={addUsername}/>
    
        </div>
        <div><LogoutButton/></div>
        
    </>
    
    )
}


