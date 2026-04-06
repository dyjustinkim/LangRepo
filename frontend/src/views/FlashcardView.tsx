import {useAuth0} from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import { useParams } from "react-router-dom";
import {useNavigate } from 'react-router-dom';
import MyNavBar from '../components/MyNavBar.tsx';
import FlashcardPlayer from '../components/FlashcardPlayer.tsx';

export default function FlashcardViewer() {
    const {isLoading, getAccessTokenSilently} = useAuth0();
    const [username, setUsername] = useState<string>('');
    const navigate = useNavigate();
    const{project} = useParams();
        
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
          <div className="my-container">
              <FlashcardPlayer></FlashcardPlayer>
            
            <div>
            <span
              className="text-muted fs-6"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile/${project}`)}
            >
              ← Back to Project View
            </span>
          </div>

          </div>



    </>
    
    )
}


