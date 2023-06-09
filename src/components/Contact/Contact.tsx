import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import { FaInstagram, FaTwitter, FaWhatsapp, FaMailBulk } from 'react-icons/fa';
import { ContactForm, ContactItem, Social } from '@/components';

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
  return (
    <div className='p-6 mx-6 mb-2 rounded-md select-none md:p-10 md:mx-auto bg-light-gray'>
      <h1 className='mb-6 text-2xl font-bold text-left font-roboto md:text-3xl text-navy-blue'>
        ¡Ponte en contacto con QuiroJairoTerapia!
      </h1>
      <div className='grid grid-cols-1 gap-4 font-sans md:grid-cols-2 md:gap-8'>
        <ContactForm />
        <div className='space-y-4 font-sans'>
          <p className='font-semibold text-navy-blue'>
            Dirección: Calle Alpujarras, Leganés, Madrid
          </p>
          <ContactItem
            icon={<FaWhatsapp />}
            aria-label='Whatsapp Icon'
            type='whatsapp'
            contact='+34657326513'
          />
          <ContactItem
            icon={<FaMailBulk />}
            aria-label='Email Icon'
            type='mail'
            contact='quirojairoterapia@gmail.com'
          />
          <div className='w-full h-64'>
            <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={officeLocation}
                zoom={14}
              >
                {/* //TODO: Replace the marker with your own */}
                <Marker position={officeLocation} />
              </GoogleMap>
            </LoadScriptNext>
          </div>
        </div>
        {/* //TODO: Replace the Facebook and Instagram links with your own */}
        <div className='flex space-x-4 font-sans'>
          <Social
            Icon={FaTwitter}
            href='https://twitter.com/quirojairoterapia'
          />
          <Social
            Icon={FaInstagram}
            href='https://www.instagram.com/quirojairoterapia/'
          />
        </div>
      </div>
    </div>
  );
};
