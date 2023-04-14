import { services } from '@/data';
import { CTAButton } from '@/components';

export const Services = () => {
  return (
    <div className='container px-4 mx-auto mt-4 select-none md:px-8 lg:px-16'>
      <h2 className='mb-8 text-3xl font-extrabold md:text-4xl text-light-gray font-roboto text-shadow'>
        Servicios de QuiroJairoTerapia
      </h2>
      <p className='mb-8 font-sans text-base md:text-lg text-light-gray text-shadow'>
        ¡Descubre la magia del quiromasaje con QuiroJairoTerapia! Jairo, terapeuta profesional de quiromasaje, te invita
        a disfrutar de una experiencia única y transformadora. Nuestros tratamientos están especialmente diseñados para
        adaptarse a tus necesidades y preferencias, proporcionando un viaje de bienestar y relajación. Echa un vistazo a
        nuestra amplia gama de masajes y terapias:
      </p>
      <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4'>
        {services.slice(0, 4).map((service, index) => (
          <div
            key={index}
            className='flex flex-col justify-between h-full p-4 bg-white rounded-lg shadow-lg text-navy-blue'
          >
            <h3 className='mb-2 font-sans text-base font-semibold underline md:text-lg'>{service.title}</h3>
            <p className='mb-2 text-base font-bold md:text-lg font-roboto text-turquoise'>{service.price}</p>
            <p className='font-sans text-sm'>{service.description}</p>
            <div className='text-right'>
              <CTAButton label='¡Reserva!' className='' />
            </div>
          </div>
        ))}
      </div>
      <div className='grid justify-center grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3'>
        {services.slice(4).map((service, index) => (
          <div
            key={index}
            className='flex flex-col justify-between h-full p-4 bg-white rounded-lg shadow-lg text-navy-blue'
          >
            <h3 className='mb-2 font-sans text-base font-semibold underline md:text-lg'>{service.title}</h3>
            <p className='mb-4 text-base font-bold md:text-lg font-roboto text-turquoise'>{service.price}</p>
            <p className='font-sans text-sm'>{service.description}</p>
            <div className='text-right'>
              <CTAButton label='¡Reserva!' className='' />
            </div>
          </div>
        ))}
      </div>
      <div className='p-4 rounded-lg shadow-md bg-light-gray'>
        <h4 className='mb-4 text-xl font-semibold text-navy-blue'>Paquetes de descuento para clientes frecuentes:</h4>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='p-4 bg-white rounded-lg shadow-md text-navy-blue'>
            <h5 className='mb-2 text-lg font-semibold'>Bono de 5 sesiones:</h5>
            <p className='mb-2'>¡Disfruta de un 10% de descuento en el total! Paga solo 180€ en lugar de 200€.</p>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md text-navy-blue'>
            <h5 className='mb-2 text-lg font-semibold'>Bono de 10 sesiones:</h5>
            <p className='mb-2'>¡Aprovecha un 20% de descuento en el total! Paga solo 320€ en lugar de 400€.</p>
          </div>
        </div>
        <p className='mt-4 text-lg'>
          Regálate el placer de experimentar el quiromasaje con QuiroJairoTerapia y descubre una nueva dimensión de
          bienestar y equilibrio en tu vida. ¡No esperes más y reserva tu cita ahora!
        </p>
        <div className='mt-2 text-right'>
          <CTAButton label='¡Reserva!' />
        </div>
      </div>
    </div>
  );
};
