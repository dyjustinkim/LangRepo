import DeckList from '../components/Decks.tsx'
import {useAuth0} from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import MyNavBar from '../components/myNavBar.tsx';
import DocList from '../components/Docs.tsx';

export default function Decks() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [projectId, setProjectId] = useState<number | null>(null);
    const [username, setUsername] = useState<string>('');    

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
          <div className="card">
            <DeckList username={username}/>
        </div>
        <div className="card">
            <DocList username={username}/>
        </div>
    </>
    
    )
}


