import { useState } from 'react';
import autosize from 'autosize';
import emailjs from '@emailjs/browser';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API || '';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const officeLocation = {
  lat: 40.330119,
  lng: -3.751908,
};

export const Contact = () => {
  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO: Replace the service ID, template ID, and user ID with your own emailjs credentials
    emailjs
      .sendForm('your_service_id', 'your_template_id', event.currentTarget, 'your_user_id')
      .then(() => {
        alert('Message sent successfully');
        setFormValues({ name: '', email: '', phone: '', message: '' });
      })
      .catch((error) => {
        alert('An error occurred, please try again');
        console.error('EmailJS error:', error);
      });
  };

  //TODO: Refactor

  return (
    <div className='container max-w-screen-xl px-4 py-8 mx-4 mb-2 -mt-12 rounded-md md:mx-auto md:px-8 lg:px-16 bg-light-gray'>
      <h1 className='mb-6 text-2xl font-bold text-left md:text-3xl font-roboto text-navy-blue'>
        ¡Ponte en contacto con QuiroJairoMasaje!
      </h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='name'
            placeholder='Tu nombre'
            value={formValues.name}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-md border-navy-blue focus:outline-none focus:ring-2 focus:ring-turquoise'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Tu correo electrónico'
            value={formValues.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-md border-navy-blue focus:outline-none focus:ring-2 focus:ring-turquoise'
            required
          />
          <input
            type='tel'
            name='phone'
            placeholder='Tu número de teléfono'
            value={formValues.phone}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-md border-navy-blue focus:outline-none focus:ring-2 focus:ring-turquoise'
            required
          />
          <textarea
            ref={(el) => el && autosize(el)}
            name='message'
            placeholder='Escribe tu mensaje aquí...'
            value={formValues.message}
            onChange={handleChange}
            className='w-full h-32 px-4 py-2 border rounded-md border-navy-blue focus:outline-none focus:ring-2 focus:ring-turquoise'
            required
          />
          <button
            type='submit'
            className='px-4 py-2 font-semibold border rounded-md text-navy-blue border-navy-blue hover:bg-navy-blue hover:text-white'
          >
            Envía tu mensaje
          </button>
        </form>
        <div className='space-y-4'>
          {/* //TODO: Replace the address, phone number, and email with your own */}
          <p className='font-semibold'>Dirección: Jairo's Office, 123 Massage Street, Relaxation City, Tranquility</p>
          <p className='font-semibold'>Teléfono: +1 (555) 123-4567</p>
          <p className='font-semibold'>Correo electrónico: jairo@quirojairomasaje.com</p>
          <div className='w-full h-64'>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={officeLocation} zoom={14}>
                <Marker position={officeLocation} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div className='flex space-x-4'>
          {/* //TODO: Replace the Facebook and Instagram links with your own */}
          <a
            href='https://www.facebook.com/jairosmassage'
            target='_blank'
            rel='noopener noreferrer'
            className='text-turquoise hover:text-turquoise-dark'
          >
            <FaFacebookF size={32} />
          </a>
          <a
            href='https://www.instagram.com/jairosmassage'
            target='_blank'
            rel='noopener noreferrer'
            className='text-turquoise hover:text-turquoise-dark'
          >
            <FaInstagram size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};
