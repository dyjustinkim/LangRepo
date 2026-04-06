import DeckList from '../components/DeckList.tsx'
import {useAuth0} from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import MyNavBar from '../components/MyNavBar.tsx';
import DocList from '../components/Docs.tsx';
import {useNavigate } from 'react-router-dom';


export default function Decks() {
    const {isLoading, getAccessTokenSilently} = useAuth0();
    const [username, setUsername] = useState<string>('');    
    const navigate = useNavigate();

      if (isLoading) {
        return <div>Loading profile...</div>
    }

    const fetchUser = async () => {
            try {
              const response = await authApi.get('/users', getAccessTokenSilently);
              setUsername(response.data.username);
            } catch (error) {
              console.error("Error fetching User", error);
            }
          };
    
        useEffect(() => {
            fetchUser();
          }, []);
        
    return (
    
    <>
        <MyNavBar username={username}></MyNavBar>
        <div className="my-container">
            <DeckList/>
            <DocList/>

            <div>
                <span
                  className="text-muted fs-6"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/profile`)}
                >
                  ← Back to Profile View
                </span>
              </div>
            </div>
    </>
    
    )
}


