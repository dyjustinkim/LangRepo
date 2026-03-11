import { Document, Page } from 'react-pdf';
import PdfViewer from '../components/PdfViewer';
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import { useParams } from "react-router-dom";
import MyNavBar from '../components/myNavBar.tsx';

export default function Docs() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {doc} = useParams();
    const [username, setUsername] = useState<string>('');
    const [url, setURL] = useState<any>('');
        
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

    const viewDoc = async () => {
                try {
                  const my_url = await authApi.get(`/docs/view/${doc}`, getAccessTokenSilently);
                  setURL(my_url);
                } catch (error) {
                  console.error("Error fetching Doc", error);
                }
              };
        
            useEffect(() => {
                fetchUser();
                viewDoc();
              }, []);


  return (

     <>
        <MyNavBar username={username}></MyNavBar>
          <div className="card">
                  {url && <div> 
                    <h2>{url.data.name}</h2>
                    <PdfViewer url={url.data.url} /> 
                    </div>}

        </div>



    </>
    
  );
}