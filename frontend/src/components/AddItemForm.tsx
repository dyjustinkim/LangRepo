import React, { useState } from 'react';

interface AddItemFormProps {
  addItem: (name: string) => void; // addItem is a function accepting a string and returning nothing
}

const AddItemForm: React.FC<AddItemFormProps> = ({ addItem }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (itemName) {
      addItem(itemName);
      setItemName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter Item name"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;