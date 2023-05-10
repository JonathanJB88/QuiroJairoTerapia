import { useState } from 'react';
import { AuthModal, StarRating } from '@/components';
import { useAuthStore } from '@/hooks';

export const CommentBox = () => {
  const { status, user, logout } = useAuthStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const handleLogout = () => {
    logout();
    toggleDropdown();
    toggleAuthModal();
  };

  return (
    <div className='relative p-4 rounded-lg shadow-md bg-light-gray'>
      <div className='absolute top-0 right-0 p-4'>
        {status === 'authenticated' ? (
          <div className='relative'>
            <button
              className='flex space-x-2 text-xs font-semibold text-navy-blue focus:outline-none'
              onClick={toggleDropdown}
            >
              <span>{user?.name}</span>
              <span>&#x25BC;</span>
            </button>
            {showDropdown && (
              <div className='absolute right-0 mt-2 bg-white rounded shadow-md'>
                <button
                  className='block w-full px-2 py-1 text-xs font-semibold text-left text-navy-blue hover:bg-gray-100'
                  onClick={handleLogout}
                >
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

          // placeholder={user ? 'Describe tu experiencia aquí...' : 'Inicia sesión para escribir un comentario'}
          // disabled={!user}
        />
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-col items-center justify-center md:flex-row'>
            <h2 className='font-bold md:text-xl font-roboto text-navy-blue md:px-2'>Califica el Servicio</h2>
            <div>
              <StarRating
                rating={5}
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
