import React, { useState } from 'react';

interface addItemFormProps {
  loading: boolean;
  label: string;
  onSuccess: (name: string) => void;
  
}

const addItem: React.FC<addItemFormProps> = ({ loading, label, onSuccess }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (itemName) {
      onSuccess(itemName);
      setItemName('');
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="d-flex gap-2">
        <input
          className="form-control flex-grow-1"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder={"Enter " + label + " name"}
        />
        <button disabled={loading} className="btn btn-primary text-nowrap" type="submit">
          {loading ? (
                    <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Adding...
                    </>
                ) : (
                    `Add ${label}`
                )}
        </button>
      </div>
    </form>
  );
};

export default addItem
