import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import { useParams } from "react-router-dom";
import MyNavBar from '../components/myNavBar.tsx';

export default function Flashcards() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {username} = useParams();
    const [projectId, setProjectId] = useState<number | null>(null);
        
      if (isLoading) {
        return <div>Loading profile...</div>
    }
    
    return (
    
    <>
        <MyNavBar></MyNavBar>
          <div className="card">
            Flashcard View
        </div>
    </>
    
    )
}


