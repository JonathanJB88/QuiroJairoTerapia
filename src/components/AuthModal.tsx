import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { AuthForm } from '@/components';

interface AuthModalProps {
  toggleAuthModal: () => void;
}

export const AuthModal = ({ toggleAuthModal }: AuthModalProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toogleIsFlipped = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-60'>
      <div className='w-3/4 md:w-1/4'>
        <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
          <AuthForm toogleIsFlipped={toogleIsFlipped} type='login' toggleAuthModal={toggleAuthModal} />
          <AuthForm toogleIsFlipped={toogleIsFlipped} type='register' toggleAuthModal={toggleAuthModal} />
        </ReactCardFlip>
      </div>
    </div>
  );
};
