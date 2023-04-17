import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const emailjsUserApiKey = process.env.NEXT_PUBLIC_EMAILJS_USER_API_KEY || '';

export const useContact = () => {
  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toastNotification = useCallback((notificationType: 'success' | 'error', message: string) => {
    toast[notificationType](message);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
      setErrorMessage('');
    },
    [formValues]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!emailjsServiceId || !emailjsTemplateId || !emailjsUserApiKey) {
        const envErrorMessage =
          'Configure las variables de entorno emailjsServiceId, emailjsTemplateId y emailjsUserApiKey.';
        setErrorMessage(envErrorMessage);
        toastNotification('error', envErrorMessage);
        return;
      }

      setLoading(true);

      try {
        const result = await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            from_name: formValues.name,
            from_email: formValues.email,
            from_phone: formValues.phone,
            message: formValues.message,
          },
          emailjsUserApiKey
        );
        setMessageSent(result.status === 200);
        if (result.status === 200) {
          toastNotification('success', '¡Mensaje enviado con éxito!');
          setFormValues({ name: '', email: '', phone: '', message: '' });
        }
      } catch (error) {
        const sendingErrorMessage = 'Se ha producido un error al enviar el mensaje. Vuelva a intentarlo más tarde.';
        setMessageSent(false);
        setErrorMessage(messageSent ? '' : sendingErrorMessage);
        toastNotification('error', errorMessage);
      }
      setLoading(false);
    },
    [formValues, messageSent, errorMessage, toastNotification]
  );

  return { ...formValues, formValues, loading, messageSent, errorMessage, handleChange, handleSubmit };
};
