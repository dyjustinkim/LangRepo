import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import FlashcardDialog from "./FlashcardDialog.tsx"
import { useAuth0 } from "@auth0/auth0-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {Container, ListGroup, DropdownButton, Dropdown, Button, DropdownItem} from "react-bootstrap";
import EditDialog from './EditDialog.tsx';
import {useNavigate, Navigate } from 'react-router-dom';

interface flashcard {
  id: number
  front: string
  back: string;
}

type FlashcardListProps = {
  username: string;
};

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const{project, deck_id} = useParams();
  const [projectId, setProjectId] = useState<number | null>(null);
  const [deckName, setDeckName] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  

  const navigate = useNavigate();

  const fetchFlashcards = async () => {
    try {
      const response = await authApi.get('/flashcards/' + deck_id, getAccessTokenSilently);
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching Flashcards", error);
    }
  };

  
  const deleteFlashcard = async (flashcardId: number) => {
      try {
        const response = await authApi.delete('/flashcards/'+flashcardId, getAccessTokenSilently);
        fetchFlashcards(); 
      } catch (error) {
        console.error("Error deleting Flashcard", error);
      }
    };
    

  const addFlashcard = async (front: string, back: string) => {
    try {
      await authApi.post('/flashcards', { front, back, deck_id}, getAccessTokenSilently);
      fetchFlashcards(); 
    } catch (error) {
      console.error("Error adding Flashcard", error);
    }
  };

  

  const editFlashcard = async (front: string, back: string, flashcardId: number | undefined) => {
      try {
        await authApi.put('/flashcards/'+flashcardId, {front, back, deck_id}, getAccessTokenSilently);
        fetchFlashcards(); 
      } catch (error) {
        console.error("Error editing Flashcard", error);
      }
    }; 
  

  async function getProjectId() {
            
    const response = await authApi.get('/projects/'+project, getAccessTokenSilently);
    setProjectId(response.data.project_id);
    };

  async function getDeckName() {
            
    const response = await authApi.get('/decks/map/'+ deck_id, getAccessTokenSilently);
    setDeckName(response.data.name);
    }

  useEffect(() => {
    getProjectId();
    getDeckName();
    fetchFlashcards();
  }, []);
 

  return (
    <div className="card">
      <h2>{project}: {deckName} Flashcards List</h2> 
        <Container>
            <table className="table">
            <thead>
                <tr>
                <th>Front</th>
                <th>Back</th>
                </tr>
            </thead>

            <tbody>
                {flashcards.map((card) => (
                <tr key={card.id}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <DropdownButton title="Settings">
                        <DropdownItem onClick={() => setShowEdit(true)}>Edit Flashcard</DropdownItem>
                        <FlashcardDialog
                        show={showEdit}
                        onHide={() => setShowEdit(false)}
                        label="Edit Flashcard"
                        flashcard_id={card.id}
                        onSuccess={editFlashcard}
                        oldFront={card.front}
                        oldBack={card.back}
                        />

                        <Dropdown.Item onClick={() => deleteFlashcard(card.id)}>Delete</Dropdown.Item>
                    </DropdownButton>  
                </tr>
                ))}
            </tbody>
        </table>

        <div className="d-flex justify-content-evenly mt-3">
            <Button onClick={() => navigate(`/profile/${project}/decks/${deck_id}/study`)}>Study Flashcards</Button>
            <Button onClick={() => setShowAdd(true)}>Add Flashcards</Button>

            <FlashcardDialog
            show={showAdd}
            onHide={() => setShowAdd(false)}
            label="Add Flashcards"
            onSuccess={addFlashcard}
            />

        </div>
        </Container>
        
    </div>
  );
};


export default FlashcardList;