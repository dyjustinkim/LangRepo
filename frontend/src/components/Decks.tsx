import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import AddItem from './AddItem.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {Container, ListGroup, DropdownButton, Dropdown} from "react-bootstrap";
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
    <div>
      <h2>Project: {project} Decks List</h2>
      <Container>
  
          <ListGroup>
            {decks.map((deck, index) => (
            <ListGroup.Item 
            key={index}
            className = "d-flex justify-content-between align-items-center"
            >
                <Link to={`/profile/${project}/decks/${deck.name}`}>{deck.name}</Link>
                <DropdownButton title="Settings">
                    <EditDialog oldName={deck.name} oldId={deck.id} onSuccess={editDeck}>Edit</EditDialog>
                    <Dropdown.Item onClick={() => deleteDeck(deck.id)}>Delete</Dropdown.Item>
                </DropdownButton>              
              </ListGroup.Item>
        ))}
          </ListGroup>

      < AddItem label="Deck" endpoint="/decks" onSuccess={addDeck} />
      </Container>
    </div>
  );
};

export default DeckList;