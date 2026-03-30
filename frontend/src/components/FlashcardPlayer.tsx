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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handlePrev = () => {
  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);
    setIsFlipped(false)
  }
};

const handleNext = () => {
  if (currentIndex < flashcards.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setIsFlipped(false)
  }
};

  useEffect(() => {
    getDeckName();
    fetchFlashcards();
  }, []); 



  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      setCurrentIndex(0);
    }
  }, [flashcards]);

  return (
    <div className="card w-100">
      <h2>{project}: {deckName} Flashcards</h2> 
      <>
        <span className={`text-muted`} >
            {currentIndex + 1}/{flashcards.length}
          </span>
        {flashcards[currentIndex] && 
        (<Flashcard 
        key={currentIndex}
        front={flashcards[currentIndex]!.front} 
        back={flashcards[currentIndex]!.back}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}>
        </Flashcard>)}
        <div style={{width: '55%'}} className="d-flex justify-content-between">
          <span
            className={`text-muted small ${currentIndex === 0 ? "disabled-link" : ""}`}
            style={{ cursor: currentIndex === 0 ? "not-allowed" : "pointer" }}
            onClick={handlePrev}
          >
            ← Previous
          </span>
          <span
            className={`text-muted small ${
              currentIndex === flashcards.length - 1 ? "disabled-link" : ""
            }`}
            style={{
              cursor:
                currentIndex === flashcards.length - 1 ? "not-allowed" : "pointer",
            }}
            onClick={handleNext}
          >
            Next →
          </span>
        </div>

        <div className="d-flex gap-4 align-items-center">
            <Button >Shuffle Flashcards</Button>
            <Button onClick={() => navigate(`/profile/${project}/decks/${deck_id}/edit`)}>Edit Flashcards</Button>
        </div>
      </>
        
    </div>
    
  );
};




export default FlashcardPlayer;