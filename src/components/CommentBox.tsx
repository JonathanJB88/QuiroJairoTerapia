import { useState, use } from 'react';
import { AuthModal, StarRating } from '@/components';
import { useAuthStore, useCommentStore, useForm } from '@/hooks';
import autosize from 'autosize';
import { toastNotification } from '@/helpers';
import { Comment } from '@/store';
import { CommentType } from '@/interfaces';

interface CommentFormFields {
  content: string;
  rating: number;
}

const initialCommentFormFields: CommentFormFields = {
  content: '',
  rating: 5,
};

export interface CommentToPost extends CommentFormFields {
  userId: string;
  type: CommentType;
  postId?: string;
  approved?: boolean;
}

export const CommentBox = () => {
  const { status, user, logout } = useAuthStore();
  const { status: commentStatus, postComment } = useCommentStore();
  const { content, rating, onInputChange, setFormState, onResetForm } =
    useForm<CommentFormFields>(initialCommentFormFields);

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
    onResetForm();
  };

  const handleRatingChange = (newRating: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, rating: newRating }));
  };

  const handleSubmit = async () => {
    if (!user) return toggleAuthModal();
    if (!content) return toastNotification('error', 'Por favor, completa todos los campos.');
    const comment: CommentToPost = {
      userId: user.uid,
      content,
      rating,
      type: 'review',
    };
    const { ok, msg } = await postComment(comment);
    if (ok) toastNotification('success', msg);
    onResetForm();
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
        <h3 className='text-2xl font-bold font-roboto text-navy-blue'>Escribe tu reseña</h3>
        <textarea
          className='w-full h-32 p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          placeholder={user ? 'Describe tu experiencia aquí...' : 'Inicia sesión para escribir un comentario.'}
          disabled={!user}
          ref={(el) => el && autosize(el)}
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
            {commentStatus === 'loading' ? (
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
