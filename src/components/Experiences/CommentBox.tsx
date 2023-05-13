import { useEffect, useMemo, useRef } from 'react';
import autosize from 'autosize';
import { AuthModal, StarRating } from '@/components';
import { useAuthStore, useSubmitComment, useUIStore } from '@/hooks';

export const CommentBox = () => {
  const { status, user, logout } = useAuthStore();
  const { showAuthModal, showDropdown, toggleAuthModal, toggleDropdown, resetUI } = useUIStore();

  const { content, rating, isPosting, onInputChange, handleRatingChange, handleSubmit, onResetForm } =
    useSubmitComment();

  const handleLogout = () => {
    logout();
    onResetForm();
    resetUI();
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
    return () => {
      if (textareaRef.current) {
        autosize.destroy(textareaRef.current);
      }
    };
  }, []);

  const userDropdown = useMemo(
    () =>
      status === 'authenticated' && (
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
      ),
    [status, user, showDropdown]
  );

  const loginButton = useMemo(
    () =>
      status === 'unauthenticated' && (
        <button className='text-xs font-semibold text-navy-blue focus:outline-none' onClick={toggleAuthModal}>
          Iniciar Sesión
        </button>
      ),
    [status]
  );

  return (
    <div className='relative p-4 rounded-lg shadow-md bg-light-gray'>
      <div className='absolute top-0 right-0 p-4'>
        {userDropdown}
        {loginButton}
      </div>
      {showAuthModal && <AuthModal />}

      <div className='flex flex-col space-y-4'>
        <h3 className='text-2xl font-bold font-roboto text-navy-blue'>Escribe tu reseña</h3>
        <textarea
          className='w-full h-32 p-2 border rounded-md border-navy-blue focus:outline-none focus:ring-2 focus:ring-turquoise'
          placeholder={user ? 'Describe tu experiencia aquí...' : 'Inicia sesión para escribir un comentario.'}
          disabled={!user}
          ref={textareaRef}
          name='content'
          value={content}
          onChange={onInputChange}
        />
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-col items-center justify-center md:flex-row'>
            <h2 className='font-bold md:text-xl font-roboto text-navy-blue md:px-2'>Califica el Servicio</h2>
            <div>
              <StarRating rating={rating || 5} onRatingChange={handleRatingChange} readOnly={!user} />
            </div>
          </div>
          <button
            className='flex flex-col items-center px-2 py-1 font-sans text-xs font-semibold rounded-md md:flex-row md:text-sm text-navy-blue bg-turquoise md:px-8 md:py-2 hover:bg-opacity-80'
            type='submit'
            onClick={handleSubmit}
          >
            {isPosting ? (
              <span className='mr-1'>Publicando...</span>
            ) : (
              <>
                <span className='mr-1'>Publicar</span>
                <span>comentario</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
