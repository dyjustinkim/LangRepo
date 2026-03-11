import React, { useState } from 'react';

interface addItemFormProps {
  label: string;
  onSuccess: (name: string) => void;
  
}

const addItem: React.FC<addItemFormProps> = ({ label, onSuccess }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (itemName) {
      onSuccess(itemName);
      setItemName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder={"Enter " + label + " name"}
      />
      <button type="submit">Add {label}</button>
    </form>
  );
};

export default addItem
