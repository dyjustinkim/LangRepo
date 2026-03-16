import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import MyNavBar from '../components/myNavBar.tsx';
import { Container } from 'react-bootstrap';
import AddItem from '../components/AddItemForm.tsx';
import EditDialog from '../components/EditDialog.tsx';
import {useNavigate, Navigate } from 'react-router-dom';

export default function Account() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [username, setUsername] = useState<string>('');
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
          fetchUser();
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Enter new username"}
          />
          <button type="submit">Update</button>
        </form>
      );
    };

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
            <h2>Account Settings</h2>
            <h2>Current Username: {username}</h2>
      <Container>
        < EditName/>
        </Container>
        </div>

    
    </>
    
    )



}