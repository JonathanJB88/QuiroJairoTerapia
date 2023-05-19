import { useEffect, useRef } from 'react';
import autosize from 'autosize';
import { HiHome } from 'react-icons/hi';
import { IoIosSend } from 'react-icons/io';
import { useSubmitChat } from '@/hooks';
import { toastNotification } from '@/helpers';

const textareaClassname = 'flex-1 p-2 font-sans text-sm border rounded-md focus:outline-none';

export const QuirobotChatForm = () => {
  const {
    chatMessages,
    message,
    loading,
    formValidation,
    errorMessage,
    onInputChange,
    handleSubmit,
    handleResetChat,
    sendMessageAndResetForm,
  } = useSubmitChat();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const currentTextareaRef = textareaRef.current;
    if (!currentTextareaRef) return;
    autosize(currentTextareaRef);
    autosize.update(currentTextareaRef);
    currentTextareaRef.focus();

    return () => {
      if (!currentTextareaRef) return;
      autosize.destroy(currentTextareaRef);
    };
  }, [textareaRef, chatMessages, loading, handleResetChat]);

  useEffect(() => {
    if (errorMessage) toastNotification('error', errorMessage);
  }, [errorMessage]);

  return (
    <form onSubmit={handleSubmit} className='flex items-center p-2 space-x-1 bg-light-gray md:rounded-b-xl'>
      <HiHome className='w-8 h-8 cursor-pointer text-turquoise' onClick={handleResetChat} />
      <textarea
        className={`${textareaClassname} ${
          formValidation.message
            ? 'border-red-500'
            : 'focus:ring-2 focus:ring-turquoise border-navy-blue focus:border-transparent'
        }`}
        placeholder='Escribe tu consulta...'
        rows={1}
        aria-label='Escribe tu consulta'
        ref={textareaRef}
        maxLength={300}
        name='message'
        value={message}
        onChange={onInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessageAndResetForm();
          }
        }}
      />
      <span className='p-1 text-xs opacity-50 text-navy-blue'>{message.length}/300</span>
      <button type='submit'>
        <IoIosSend className='w-8 h-8 cursor-pointer text-turquoise' />
      </button>
    </form>
  );
};
