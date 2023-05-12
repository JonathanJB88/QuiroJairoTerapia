import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaInstagram, FaTwitter, FaWhatsapp, FaMailBulk } from 'react-icons/fa';
import { ContactForm, ContactItem, Social } from '@/components';
import { useContact } from '@/hooks';

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
  const { loading, formValues, handleChange, handleSubmit } = useContact();

  return (
    <div className='container max-w-screen-xl px-4 py-8 mx-4 mb-2 -mt-12 rounded-md select-none md:mx-auto md:px-8 lg:px-16 bg-light-gray'>
      <h1 className='mb-6 text-2xl font-bold text-left font-roboto md:text-3xl text-navy-blue'>
        ¡Ponte en contacto con QuiroJairoTerapia!
      </h1>
      <div className='grid grid-cols-1 gap-4 font-sans md:grid-cols-2 md:gap-8'>
        <ContactForm loading={loading} values={formValues} handlers={{ handleChange, handleSubmit }} />
        <div className='space-y-4 font-sans'>
          <p className='font-semibold text-navy-blue'>Dirección: Calle Alpujarras, Leganés, Madrid</p>
          <ContactItem icon={<FaWhatsapp />} aria-label='Whatsapp Icon' type='whatsapp' contact='+34657326513' />
          <ContactItem
            icon={<FaMailBulk />}
            aria-label='Email Icon'
            type='mail'
            contact='quirojairoterapia@gmail.com'
          />
          <div className='w-full h-64'>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={officeLocation} zoom={14}>
                {/* //TODO: Replace the marker with your own */}
                <Marker position={officeLocation} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        {/* //TODO: Replace the Facebook and Instagram links with your own */}
        <div className='flex space-x-4 font-sans'>
          <Social Icon={FaTwitter} href='https://twitter.com/quirojairoterapia' />
          <Social Icon={FaInstagram} href='https://www.instagram.com/quirojairoterapia/' />
        </div>
      </div>
    </div>
  );
};
