import React, { useEffect, useState } from 'react';
import {useNavigate, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import authApi from '../api/apiClient.ts';


export default function AuthGate() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
        
      const response = await authApi.get('/users', getAccessTokenSilently);
       if (response.data == null) {
        navigate("/register", { replace: true });
      } else {
        navigate(`/profile`, { replace: true });
      }
    }
    if (isAuthenticated) {
        checkUser();
    }
   



  }, [isAuthenticated]);

  return <div>Loading...</div>;
}