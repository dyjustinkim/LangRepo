import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import { useParams } from "react-router-dom";
import MyNavBar from '../components/myNavBar.tsx';
import { Container } from 'react-bootstrap';
import AddItem from '../components/AddItem.tsx';
import EditDialog from '../components/EditDialog.tsx';
import {useNavigate, Navigate } from 'react-router-dom';

export default function Account() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {username} = useParams();
    const [projectId, setProjectId] = useState<number | null>(null);
    const navigate = useNavigate();
        

      if (isLoading) {
        return <div>Loading profile...</div>
    }
    const editUsername = async (userId: string | number, newName: string) => {
        try {
          await authApi.put('/users/'+userId, {username: newName, user_id: " "}, getAccessTokenSilently);
        } catch (error: any) {
            
            if (error) {
          console.error("Error editing Username", error);
        }
        }
      };
    
  

    const EditName = ({ }) => {
      const [username, setUsername] = useState('');
    
      const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username) {
          await editUsername(user!.sub!, username);
          navigate(`/${username}/account`, { replace: true })
          setUsername('');
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Enter new username"}
          />
          <button type="submit">Update</button>
        </form>
      );
    };

    
    
    return (
    
    <>
        <MyNavBar></MyNavBar>

        <div className="card">
            <h2>Account Settings</h2>
            <h2>Current Username: {username}</h2>
      <Container>
        < EditName/>
        </Container>
        </div>

    
    </>
    
    )



}