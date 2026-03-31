import {useAuth0} from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import MyNavBar from '../components/myNavBar.tsx';
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
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="d-flex gap-2">
            <input
            className="form-control flex-grow-1"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"Enter new username"}
            />
            <button className="btn btn-primary text-nowrap" type="submit">Update</button>
          </div>
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
        <div className="my-container">
        <div className="card">
            <h2 style={{ fontSize: "2rem" }}>Account Settings</h2>
            <p style={{ fontSize: "1.6rem" }}>Current Username: <span style={{ color: "blue" }}>{username}</span></p>
        < EditName/>
        </div>
        </div>

    
    </>
    
    )



}