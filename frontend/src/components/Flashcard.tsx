import React, { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardStyle: React.CSSProperties = {
    width: '300px',
    height: '200px',
    perspective: '1000px',
    cursor: 'pointer',
    margin: '20px auto'
  };

  const innerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const sideStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
  };

  const backSideStyle: React.CSSProperties = {
    ...sideStyle,
    transform: 'rotateY(180deg)',
    backgroundColor: '#f8f9fa',
  };

  return (
    <div style={cardStyle} onClick={handleFlip}>
      <div style={innerStyle}>
        <div style={sideStyle}>
          {front}
        </div>

        <div style={backSideStyle}>
          {back}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;