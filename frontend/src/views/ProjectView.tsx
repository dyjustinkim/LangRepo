import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import ProjectList from '../components/Projects.tsx';
import { useParams } from "react-router-dom";


export default function Projects() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {username} = useParams();
    
    
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
            <ProjectList />
        </div>
        <div><LogoutButton /> </div>
    </>
    
    )
}


