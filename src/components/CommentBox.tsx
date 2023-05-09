import { useState } from 'react';
import { AuthModal, StarRating } from '@/components';

interface CommentBoxProps {
  onSubmit: (rating: number, comment: string) => void;
}

export const CommentBox = ({ onSubmit }: CommentBoxProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const toggleRegistrationForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  const handleSubmit = () => {
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const userName = 'Usuario';

  return (
    <div className='relative p-4 rounded-lg shadow-md bg-light-gray'>
      <div className='absolute top-0 right-0 p-4'>
        {isLoggedIn ? (
          <div className='relative'>
            <button
              className='flex space-x-2 text-xs font-semibold text-navy-blue focus:outline-none'
              onClick={toggleDropdown}
            >
              <span>{userName}</span>
              <span>&#x25BC;</span>
            </button>
            {showDropdown && (
              <div className='absolute right-0 mt-2 bg-white rounded shadow-md'>
                <button className='block w-full px-2 py-1 text-xs font-semibold text-left text-navy-blue hover:bg-gray-100'>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className='text-xs font-semibold text-navy-blue focus:outline-none' onClick={toggleAuthModal}>
            Iniciar Sesión
          </button>
        )}
      </div>
      {showAuthModal && <AuthModal toggleAuthModal={toggleAuthModal} />}

      <div className='flex flex-col space-y-4'>
        <h3 className='text-2xl font-bold font-roboto text-navy-blue'>Escribe tu comentario</h3>
        <textarea
          className='w-full h-32 p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          // placeholder={user ? 'Describe tu experiencia aquí...' : 'Inicia sesión para escribir un comentario'}
          // disabled={!user}
        />
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-col items-center justify-center md:flex-row'>
            <h2 className='font-bold md:text-xl font-roboto text-navy-blue md:px-2'>Califica el Servicio</h2>
            <div>
              <StarRating
                rating={rating ? rating : 5}
                // onRatingChange={handleRatingChange}
                // readOnly={!user}
              />
            </div>
          </div>
          <button
            //   className={`px-4 py-2 text-white font-semibold rounded-lg
            //   ${
            //     user && rating > 0 && comment.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
            //   }`
            // }
            className='flex flex-col items-center px-2 py-1 font-sans text-xs font-semibold rounded-md md:flex-row md:text-sm text-navy-blue bg-turquoise md:px-8 md:py-2 hover:bg-opacity-80'
            onClick={handleSubmit}
            // disabled={!user || rating === 0 || !comment.trim()}
          >
            <span className='mr-1'>Publicar</span>
            <span>comentario</span>
          </button>
        </div>
      </div>
    </div>
  );
};
