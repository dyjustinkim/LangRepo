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
    const [projectId, setProjectId] = useState<number | null>(null);
    const [username, setUsername] = useState<string>('');
        
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
          <div className="card">
                  <PdfViewer url={"https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"} />

        </div>



    </>
    
  );
}