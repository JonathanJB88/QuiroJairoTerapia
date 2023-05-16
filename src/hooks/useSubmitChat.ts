import { FormEvent } from 'react';
import { FormValidators, useForm, useChatbotStore } from '@/hooks';
import { toastNotification } from '@/helpers';

interface MessageField {
  message: string;
}

const initialMessageField: MessageField = {
  message: '',
};

const messageValidation: FormValidators<MessageField> = {
  message: {
    validator: (value) => value.trim().length < 300,
    message: 'Recuerda, brevedad es el alma del ingenio. Intenta mantener tu consulta en 300 caracteres o menos.',
  },
};

export const useSubmitChat = () => {
  const {
    formState: { message },
    formValidation,
    isFormValid,
    onInputChange,
    onResetForm,
  } = useForm<MessageField>(initialMessageField, messageValidation);
  const { chatMessages, loading, errorMessage, sendMessage, clearChat } = useChatbotStore();

  const sendMessageAndResetForm = () => {
    if (!message)
      return toastNotification(
        'error',
        'Escribir es como dar un masaje a las palabras. Por favor, escribe tu consulta.'
      );
    if (!isFormValid) return toastNotification('error', 'Asegúrate de que tu consulta sea válida.');
    sendMessage(message);
    onResetForm();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageAndResetForm();
  };

  const handleResetChat = () => {
    onResetForm();
    clearChat();
  };

  return {
    chatMessages,
    loading,
    message,
    formValidation,
    isFormValid,
    errorMessage,
    onInputChange,
    handleSubmit,
    sendMessageAndResetForm,
    handleResetChat,
  };
};
