import PdfViewer from '../components/PdfViewer';
import {useAuth0} from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import authApi from '../api/apiClient.ts';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AlertModal from '../components/AlertModal.tsx';


interface deck {
  id: number
  name: string;
}

const DocViewer = () => {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {doc_id} = useParams();
    const [decks, setDecks] = useState<deck[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<string>('null');
    const [url, setURL] = useState<any>(null);
    const [loading, setLoading] = useState(true)
    const [projectId, setProjectId] = useState<number | null>(null);
    const [showFail, setShowFail] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loadGenerate, setLoadGenerate] = useState(false);
        
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
      const handleClose = () => 
    {
        setShowSuccess(false);
        setShowFail(false);}

      const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
          event.preventDefault();
          setLoadGenerate(true);
            if (selectedDeck === 'null') {
                setShowFail(true);
            }
            else {
              try {
                console.log(selectedDeck);
                const status = await authApi.post(`/docs/${doc_id}/generate`, {deck_id: selectedDeck, project_id: projectId }, getAccessTokenSilently);
                setShowSuccess(true)
                
              } catch (error) {
              console.error("Error generating flashcards", error);
              }
            }
            setLoadGenerate(false);
        };
                  
      useEffect(() => {
          viewDoc();
        }, []);

  return (

          
        <div className="card"> 
            {url === null ? (
        <p>Fetching document...</p>
        ) : (
            <>
            <h2>{url.data.name}</h2>
        <PdfViewer url={url.data.url} loadingFunc={setLoading} /> 
        <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
            <div className="d-flex gap-3 align-items-center">
                <select className="form-select" aria-label="Select example" defaultValue="def" onChange={(e) => setSelectedDeck(e.target.value)}>
                    <option value="null" key="def">Select a deck to add flashcards to</option>
                    {decks.map((deck, index) => (
                    <option value={deck.id.toString()} key={index}>{deck.name}</option>))}
                    </select>
                <Button disabled={loadGenerate} type="submit" className="text-nowrap">
                {loadGenerate ? (
                    <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Generating...
                    </>
                ) : (
                    "Generate flashcards from document"
                )}
                </Button>

                <AlertModal show={showFail} onHide={handleClose} text={"Select a deck to generate flashcards to!"}></AlertModal>

                <AlertModal show={showSuccess} onHide={handleClose} text={"Successfully generated flashcards!"}></AlertModal>

            </div>
            </div>
        </Form>
        </>)}
        </div>
                    



    
  );
}

export default DocViewer;