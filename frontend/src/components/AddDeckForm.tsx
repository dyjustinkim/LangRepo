import React, { useState } from 'react';

interface addDeckFormProps {
  addDeck: (name: string) => void; // addDeck is a function accepting a string and returning nothing
}

const addDeckForm: React.FC<addDeckFormProps> = ({ addDeck }) => {
  const [deckName, setDeckName] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deckName) {
      addDeck(deckName);
      setDeckName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        placeholder="Enter Deck name"
      />
      <button type="submit">Add Deck</button>
    </form>
  );
};

export default addDeckForm;