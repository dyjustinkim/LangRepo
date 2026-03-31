import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import AddItem from './AddItemForm.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {ListGroup, DropdownButton, Dropdown} from "react-bootstrap";
import EditDialog from './EditDialog.tsx';


interface deck {
  id: number
  name: string;
}

type DeckListProps = {
  username: string;
};

const DeckList =({username}: DeckListProps) => {
  const [decks, setDecks] = useState<deck[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const{project, deck} = useParams();
  const [projectId, setProjectId] = useState<number | null>(null);


  const fetchDecks = async () => {
    try {
      const response = await authApi.get('/decks/' + projectId, getAccessTokenSilently);
      setDecks(response.data);
    } catch (error) {
      console.error("Error fetching Decks", error);
    }
  };

  const deleteDeck = async (deckId: number) => {
      try {
        const response = await authApi.delete('/decks/'+deckId, getAccessTokenSilently);
        fetchDecks(); 
      } catch (error) {
        console.error("Error deleting Deck", error);
      }
    };

  const addDeck = async (deckName: string) => {
    try {
      await authApi.post('/decks', { name: deckName, project_id: projectId }, getAccessTokenSilently);
      fetchDecks(); 
    } catch (error) {
      console.error("Error adding Deck", error);
    }
  };

  const editDeck = async (deckId: string | number, newName: string) => {
      try {
        await authApi.put('/decks/'+deckId, { name: newName, project_id: projectId }, getAccessTokenSilently);
        fetchDecks(); 
      } catch (error) {
        console.error("Error editing Deck", error);
      }
    };
  

  async function getProjectId() {
            
    const response = await authApi.get('/projects/'+project, getAccessTokenSilently);
    setProjectId(response.data.project_id);
    };

  useEffect(() => {
    getProjectId();
  }, []);
  useEffect(() => {
  if (projectId !== null) {
    fetchDecks();
  }
}, [projectId]);

  return (
    !decks ? (
    <>
      <h4>Loading decks...</h4>
    </>
  ) : (
    <div className="card">
      <h2>{project}: Flashcard Decks</h2>
  
          <ListGroup style={{width:"80%"}}>
            {decks.map((deck, index) => (
            <ListGroup.Item 
            key={index}
            className = "d-flex justify-content-between align-items-center"
            >
                <Link to={`/profile/${project}/decks/${deck.id}/study`} style={{fontSize: "1.2rem", fontWeight: "bold"}} >{deck.name}</Link>
                <DropdownButton title="Settings">
                    <EditDialog oldName={deck.name} oldId={deck.id} onSuccess={editDeck}>Rename</EditDialog>
                    <Dropdown.Item onClick={() => deleteDeck(deck.id)}>Delete</Dropdown.Item>
                </DropdownButton>              
              </ListGroup.Item>
        ))}
          </ListGroup>

      < AddItem label="Deck" onSuccess={addDeck} />
    </div>
  )
  );
};

export default DeckList;