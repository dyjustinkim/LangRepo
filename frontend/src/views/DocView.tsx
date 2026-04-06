import {useAuth0} from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import MyNavBar from '../components/MyNavBar.tsx';
import DocViewer from '../components/DocViewer.tsx';
import {useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


export default function Docs() {
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
            <DocViewer></DocViewer>
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


