import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import ProjectList from '../components/ProjectList.tsx';
import MyNavBar from '../components/myNavBar.tsx';

export default function Projects() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
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
            <ProjectList username={username}/>
        </div>
    </>
    
    )
}


