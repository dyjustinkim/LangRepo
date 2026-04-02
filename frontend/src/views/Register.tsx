import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import AddItem from '../components/AddItemForm';
import authApi from '../api/apiClient';
import {useNavigate, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AlertModal from '../components/AlertModal';

export default function Register() {
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false)
    const [exists, setExists] = useState(false)
    const navigate = useNavigate();

    const handleClose = () => 
    {
      setExists(false)}

    const addUsername = async (username: string) => {
        try {
          setLoading(true)
          const response = await authApi.post('/users', {username: username, user_id: " "}, getAccessTokenSilently);
          console.log(response)
          if (response.data.exists != true) {
            navigate(`/profile`, { replace: true }); }
          else {
            setExists(true)
          }
          setLoading(false)
        } catch (error) {
          console.error("Error adding Username", error);
        }
      };

    return (
    
    <>
        <div className="my-container"
      >
          <div className="card">
            <h1 > Welcome, new user!</h1>
          <h2> Choose your username:</h2>
            <AddItem loading={loading} label = "new user" onSuccess={addUsername}/>
          <AlertModal show={exists} onHide={handleClose} text={"That username is already taken!"}></AlertModal>
        </div>
        <div><LogoutButton/></div>
      </div>
    </>
    
    )
}


