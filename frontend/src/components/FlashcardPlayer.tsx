import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import { useAuth0 } from "@auth0/auth0-react";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {Button} from "react-bootstrap";
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
  const [loading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  function shuffleCards() {
    const shuffled = [...flashcards];
    setCurrentIndex(0)

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFlashcards(shuffled);
  }
    
  const fetchFlashcards = async () => {
    try {
      const response = await authApi.get('/flashcards/' + deck_id, getAccessTokenSilently);
      setFlashcards(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Flashcards", error);
      return null;
    }
  };  


  async function getDeckName() {
            
    const response = await authApi.get('/decks/map/'+ deck_id, getAccessTokenSilently);
    setDeckName(response.data.name);
    return ("Success")
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
    const load = async () => {
      const data = await fetchFlashcards();

      if (data && data.length === 0) {
        navigate(`/profile/${project}/decks/${deck_id}/edit`);
      }
      await getDeckName();
      setIsLoading(false);
    };

    load();

  }, []); 


  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      setCurrentIndex(0);
    }
  }, [flashcards]);

  return (
    loading ? (
    <>
      <h4> Loading flashcards... </h4>
    </>
  ) : flashcards.length === 0 ? (
      <></>
  ) : (
    
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
        <div style={{width: '580px'}} className="d-flex justify-content-between">
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
            <Button onClick={shuffleCards}>Shuffle Flashcards</Button>
            <Button onClick={() => navigate(`/profile/${project}/decks/${deck_id}/edit`)}>Edit Flashcards</Button>
        </div>
      </>
        
    </div> 
  )
  );
};




export default FlashcardPlayer;