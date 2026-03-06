import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import AddItem from './AddItem.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";


interface deck {
  id: number
  name: string;
}

const DeckList: React.FC = () => {
  const [decks, setDecks] = useState<deck[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const{projectName} = useParams();
  const [projectId, setProjectId] = useState<number | null>(null);


  const fetchDecks = async () => {
    try {
      const response = await authApi.get('/decks/' + projectId, getAccessTokenSilently);
      setDecks(response.data);
    } catch (error) {
      console.error("Error fetching Decks", error);
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

  async function getProjectId() {
            
    const response = await authApi.get('/mapproject/'+projectName, getAccessTokenSilently);
    setProjectId(response.data.project_id);
    };

  useEffect(() => {
    getProjectId();
    fetchDecks();
  }, []);

  return (
    <div>
      <h2>Project: {projectName} Decks List</h2>
      <Container>
  
          <ListGroup>
            {decks.map((deck, index) => (
          <div key={index}>
            <ListGroup.Item>
                <Link to={'/Login'}>{deck.name}</Link>              
              </ListGroup.Item>
          </div>
        ))}
          </ListGroup>

      < AddItem label="Deck" endpoint="/decks" onSuccess={addDeck} />
      </Container>
    </div>
  );
};

export default DeckList;