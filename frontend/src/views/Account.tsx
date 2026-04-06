import {useAuth0} from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import MyNavBar from '../components/MyNavBar.tsx';
import AlertModal from '../components/AlertModal.tsx';

export default function Account() {
    const {user, isLoading, getAccessTokenSilently} = useAuth0();
    const [username, setUsername] = useState<string>('');
    const [exists, setExists] = useState(false)
        

      if (isLoading) {
        return <div>Loading profile...</div>
    }
    const editUsername = async (userId: string | number, newName: string) => {
        try {
          const response = await authApi.put('/users/'+userId, {username: newName, user_id: " "}, getAccessTokenSilently);
          if (response.data.exists == true) {
            setExists(true) }
        } catch (error: any) {
            
            if (error) {
          console.error("Error editing Username", error);
        }
        }
      };
    
    const handleClose = () => 
    {
      setExists(false)}
  

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
        <AlertModal show={exists} onHide={handleClose} text={"That username is already taken!"}></AlertModal>
        </div>
        </div>

    
    </>
    
    )



}