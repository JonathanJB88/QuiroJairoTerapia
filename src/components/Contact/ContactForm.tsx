import autosize from 'autosize';
import { useEffect, useRef } from 'react';

interface ContactFormProps {
  loading: boolean;
  values: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  handlers: {
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  };
}

const inputClassName =
  'w-full px-4 py-2 border rounded-md border-navy-blue focus:outline-none focus:ring-2 focus:ring-turquoise';

export const ContactForm = ({
  loading,
  values: { name, email, phone, message },
  handlers: { handleChange, handleSubmit },
}: ContactFormProps) => {
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

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <input
        type='text'
        name='name'
        placeholder='Tu nombre'
        value={name}
        onChange={handleChange}
        className={inputClassName}
        required
      />
      <input
        type='email'
        name='email'
        placeholder='Tu correo electrónico'
        value={email}
        onChange={handleChange}
        className={inputClassName}
        required
      />
      <input
        type='tel'
        name='phone'
        placeholder='Tu número de teléfono'
        value={phone}
        onChange={handleChange}
        className={inputClassName}
        required
      />
      <textarea
        ref={textareaRef}
        name='message'
        placeholder='Escribe tu mensaje aquí...'
        value={message}
        onChange={handleChange}
        className={`${inputClassName} h-32`}
        required
      />
      <button
        type='submit'
        className='px-4 py-2 font-semibold transition-colors duration-300 border rounded-md text-navy-blue border-navy-blue hover:bg-navy-blue hover:text-white'
      >
        {loading ? 'Enviando tu mensaje...' : 'Envía tu mensaje'}
      </button>
    </form>
  );
};
