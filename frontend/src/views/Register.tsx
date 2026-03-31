import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import AddItem from '../components/AddItemForm';
import authApi from '../api/apiClient';
import {useNavigate, Navigate } from 'react-router-dom';

export default function Register() {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const addUsername = async (username: string) => {
        try {
          await authApi.post('/users', {username: username, user_id: " "}, getAccessTokenSilently);
        } catch (error) {
          console.error("Error adding Username", error);
        }
        navigate(`/profile`, { replace: true });
      };

    return (
    
    <>
        <div className="my-container"
      >
          <div className="card">
            <h1 > Welcome, new user!</h1>
          <h2> Choose your username:</h2>
            <AddItem label = "new user" onSuccess={addUsername}/>
    
        </div>
        <div><LogoutButton/></div>
      </div>
    </>
    
    )
}


