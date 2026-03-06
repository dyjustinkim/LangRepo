import DeckList from '../components/Decks.tsx'
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';



export default function Decks() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [username, setUsername] = useState<string | null>(null)
    const [projectId, setProjectId] = useState<number | null>(null);
    
    useEffect(() => {
        async function getUser() {
            
        const response = await authApi.get('/users', getAccessTokenSilently);
        setUsername(response.data);
        }
        getUser();
      }, []);
    
      if (isLoading) {
        return <div>Loading profile...</div>
    }
    
    if (username===null) {
        return <div>Loading username...</div>
    }   
    
    return (
    
    <>
        <div>
          </div>
          <h1>LangRepo Prototype!!</h1>
          <h1> Welcome, {username}</h1>
          <div className="card">
            <DeckList />
        </div>
        <div><LogoutButton /> </div>
    </>
    
    )
}


