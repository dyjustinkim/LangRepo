import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import AddDeckForm from './AddDeckForm.tsx';
import { useAuth0 } from "@auth0/auth0-react";



interface deck {
  id: number
  name: string;
}

const DeckList: React.FC = () => {
  const [decks, setDecks] = useState<deck[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  const fetchDecks = async () => {
    try {
      const response = await authApi.get('/decks', getAccessTokenSilently);
      console.log(response.data);
      setDecks(response.data);
    } catch (error) {
      console.error("Error fetching Decks", error);
    }
  };

  const addDeck = async (deckName: string) => {
    try {
      await authApi.post('/decks', { name: deckName }, getAccessTokenSilently);
      fetchDecks(); 
    } catch (error) {
      console.error("Error adding Deck", error);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div>
      <h2>Decks List</h2>
      <ul>
        {decks.map((deck, index) => (
          <li key={index}>{deck.name}</li>
        ))}
      </ul>
      <AddDeckForm addDeck={addDeck} />
    </div>
  );
};

export default DeckList;