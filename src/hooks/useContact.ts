import { useCallback, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toastNotification, nameValidator, emailValidator } from '@/helpers';
import { FormValidators, useForm } from '@/hooks';

const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const emailjsUserApiKey = process.env.NEXT_PUBLIC_EMAILJS_USER_API_KEY || '';

interface ContactFormFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialContactFormFields: ContactFormFields = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const contactFormValidations: FormValidators<ContactFormFields> = {
  name: nameValidator,
  email: emailValidator,
  phone: {
    validator: (value) => value.trim().length > 8,
    message: 'Ingresa un número de teléfono válido',
  },
  message: {
    validator: (value) => value.trim().length > 10,
    message: 'Tu mensaje debe tener al menos 10 caracteres',
  },
};

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const {
    formState: { name, email, phone, message },
    isFormValid,
    formValidation,
    onInputChange,
    onResetForm,
  } = useForm<ContactFormFields>(initialContactFormFields, contactFormValidations);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!emailjsServiceId || !emailjsTemplateId || !emailjsUserApiKey) {
        return toastNotification(
          'error',
          'Configure las variables de entorno emailjsServiceId, emailjsTemplateId y emailjsUserApiKey.'
        );
      }

      if (!name || !email || !phone || !message)
        return toastNotification('error', 'Completa el formulario para enviar el mensaje.');
      if (!isFormValid) return toastNotification('error', 'Valida los campos del formulario.');

      setLoading(true);

      try {
        const result = await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            from_name: name,
            from_email: email,
            from_phone: phone,
            message: message,
          },
          emailjsUserApiKey
        );
        if (result.status === 200) {
          toastNotification('success', '¡Mensaje enviado con éxito!, te responderé a la brevedad.');
          onResetForm();
        }
      } catch (error) {
        console.error(error);
        toastNotification('error', 'Se ha producido un error al enviar el mensaje. Vuelva a intentarlo más tarde.');
      }
      setLoading(false);
    },
    [name, email, phone, message, isFormValid, onResetForm]
  );

  return { name, email, phone, message, loading, isFormValid, formValidation, onInputChange, handleSubmit };
};
