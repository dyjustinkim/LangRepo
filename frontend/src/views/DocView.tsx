import { Document, Page } from 'react-pdf';
import PdfViewer from '../components/PdfViewer';
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton.tsx';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import { useParams } from "react-router-dom";
import MyNavBar from '../components/myNavBar.tsx';

interface deck {
  id: number
  name: string;
}

export default function Docs() {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {doc_id} = useParams();
    const [decks, setDecks] = useState<deck[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<string>('null');
    const [username, setUsername] = useState<string>('');
    const [url, setURL] = useState<any>(null);
    const [loading, setLoading] = useState(true)
    const [projectId, setProjectId] = useState<number | null>(null);
        
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
                  const my_url = await authApi.get(`/docs/${doc_id}/view`, getAccessTokenSilently);
                  setURL(my_url);
                  fetchDecks(my_url.data.project_id);
                  setProjectId(my_url.data.project_id)
                } catch (error) {
                  console.error("Error fetching Doc", error);
                }
              };
    const fetchDecks = async (projectId: string) => {
        try {
          const response = await authApi.get('/decks/' + projectId, getAccessTokenSilently);
          setDecks(response.data);
        } catch (error) {
          console.error("Error fetching Decks", error);
        }
      };
      const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
          event.preventDefault();
            try {
            await authApi.post(`/docs/${doc_id}/generate`, {deck_id: selectedDeck, project_id: projectId }, getAccessTokenSilently);
            } catch (error) {
            console.error("Error generating flashcards", error);
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
                    {url === null ? (
                    <p>Fetching document...</p>
                    ) : (
                    <div>
                     <h2>{url.data.name}</h2>
                     {loading && <p>Loading document...</p>}
                    <PdfViewer url={url.data.url} loadingFunc={setLoading} /> 
                    <form onSubmit={handleSubmit}>
                    <select className="form-select" aria-label="Select example" defaultValue="def" onChange={(e) => setSelectedDeck(e.target.value)}>
                        <option value="def" key="def">Select a deck to add flashcards to</option>
                        {decks.map((deck, index) => (
                        <option value={deck.id.toString()} key={index}>{deck.name}</option>))}
                        </select>
                    <button >Generate flashcards from doc</button>
                    </form>
                    </div>
                    )}

        </div>



    </>
    
  );
}