import { CTAButton } from '@/components';

export const DiscountPackages = () => {
  return (
    <div className='p-4 rounded-lg shadow-md bg-light-gray'>
      <h4 className='mb-4 text-lg font-semibold md:text-xl text-navy-blue'>
        Paquetes de descuento para clientes frecuentes:
      </h4>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='p-4 bg-white rounded-lg shadow-md text-navy-blue'>
          <h5 className='mb-1 text-base font-semibold md:text-lg'>
            Bono de 5 sesiones:
          </h5>
          <p className='mb-1'>
            ¡Disfruta de un 10% de descuento en el total! Paga solo 180€ en
            lugar de 200€.
          </p>
        </div>
        <div className='p-4 bg-white rounded-lg shadow-md text-navy-blue'>
          <h5 className='mb-1 text-base font-semibold md:text-lg'>
            Bono de 10 sesiones:
          </h5>
          <p className='mb-1'>
            ¡Aprovecha un 20% de descuento en el total! Paga solo 320€ en lugar
            de 400€.
          </p>
        </div>
      </div>
      <div className='mt-2 text-right'>
        <CTAButton
          label='¡Reserva!'
          className='px-2 py-1 font-sans text-xs font-semibold transition-all duration-200 ease-in-out rounded-md md:text-sm text-navy-blue bg-turquoise hover:bg-opacity-80'
        />
      </div>
    </div>
  );
};
