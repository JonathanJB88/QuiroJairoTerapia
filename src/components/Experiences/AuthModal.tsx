import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { AuthForm } from '@/components';
import { toastNotification } from '@/helpers';
import { useAuthStore, useUIStore } from '@/hooks';

export const AuthModal = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { errorMessage, status } = useAuthStore();
  const { toggleAuthModal } = useUIStore();

  const toogleIsFlipped = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      toastNotification('error', errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (status === 'authenticated') {
      toastNotification('success', '¡Bienvenido!');
      toggleAuthModal();
    }
  }, [status, toggleAuthModal]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-60'>
      <div className='w-3/4 md:w-1/4'>
        <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
          <AuthForm toogleIsFlipped={toogleIsFlipped} type='login' />
          <AuthForm toogleIsFlipped={toogleIsFlipped} type='register' />
        </ReactCardFlip>
      </div>
    </div>
  );
};
