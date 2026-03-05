import React, { useState } from 'react';

interface addUsernameFormProps {
  addUsername: (name: string) => void; // addUsername is a function accepting a string and returning nothing
}

const addUsernameForm: React.FC<addUsernameFormProps> = ({ addUsername }) => {
  const [usernameName, setUsernameName] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameName) {
      addUsername(usernameName);
      setUsernameName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={usernameName}
        onChange={(e) => setUsernameName(e.target.value)}
        placeholder="Enter Username"
      />
      <button type="submit">Add Username</button>
    </form>
  );
};

export default addUsernameForm;