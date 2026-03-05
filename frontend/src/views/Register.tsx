import DeckList from '../components/Decks'
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import AddNameForm from '../components/AddNameForm';
import authApi from '../api/apiClient';
import {useNavigate, Navigate } from 'react-router-dom';



export default function Register() {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const addUsername = async (username: string) => {
        try {
          await authApi.post('/users', {nickname: username, user_id: " "}, getAccessTokenSilently);
        } catch (error) {
          console.error("Error adding Username", error);
        }

        navigate("/profile", { replace: true });
      };

    return (
    
    <>
        <div>
          </div>
          <h1>LangRepo Prototype!!</h1>
          <h1> Welcome, new user!</h1>
          <h1> Choose your username:</h1>
          <div className="card">
            <AddNameForm addUsername={addUsername}/>
        </div>
        <div><LogoutButton /> </div>
    </>
    
    )
}


