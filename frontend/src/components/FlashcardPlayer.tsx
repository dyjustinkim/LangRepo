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
import Flashcard from './Flashcard.tsx';

interface flashcard {
  id: number
  front: string
  back: string;
}

const FlashcardPlayer =() => {
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const{project, deck_id} = useParams();
  const [projectId, setProjectId] = useState<number | null>(null);
  const [deckName, setDeckName] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState<flashcard | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigate = useNavigate();

  
  const fetchFlashcards = async () => {
    try {
      const response = await authApi.get('/flashcards/' + deck_id, getAccessTokenSilently);
      setFlashcards(response.data);
    } catch (error) {
      console.error("Error fetching Flashcards", error);
    }
  };  


  async function getDeckName() {
            
    const response = await authApi.get('/decks/map/'+ deck_id, getAccessTokenSilently);
    setDeckName(response.data.name);
    }

  useEffect(() => {
    getDeckName();
    fetchFlashcards();
  }, []); 



  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      setCurrentIndex(0);
      setCurrentFlashcard(flashcards[0]);
    }
  }, [flashcards]);

  return (
    <div>
      <h2>{project}: {deckName} Flashcards</h2> 
        <Container>
            {currentFlashcard && 
              (<Flashcard front={currentFlashcard!.front} back={currentFlashcard!.back}></Flashcard>)}

            <Button onClick={() => navigate(`/profile/${project}/decks/${deck_id}/edit`)}>Edit Flashcards</Button>
        </Container>
        
    </div>
  );
};




export default FlashcardPlayer;