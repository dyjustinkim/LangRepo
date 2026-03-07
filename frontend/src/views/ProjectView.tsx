import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import ProjectList from '../components/Projects.tsx';
import { useParams } from "react-router-dom";
import MyNavBar from '../components/myNavBar.tsx';


export default function Projects() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    
    
      if (isLoading) {
        return <div>Loading profile...</div>
    }

    return (
    
    <>
        <MyNavBar></MyNavBar>
 
          <div className="card">
            <ProjectList />
        </div>
    </>
    
    )
}


