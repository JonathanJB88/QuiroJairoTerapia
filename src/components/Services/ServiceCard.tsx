import { Iservice } from '@/interfaces';
import { CTAButton } from '@/components';
import Image from 'next/image';

interface ServiceCardProps {
  service: Iservice;
}

export const ServiceCard = ({ service: { backgroundImageUrl, title, price, description } }: ServiceCardProps) => {
  return (
    <div className='relative flex flex-col justify-between h-full p-4 mx-8 md:p-8 text-navy-blue'>
      <Image
        src={backgroundImageUrl}
        fill
        alt={`${title} background`}
        className='absolute z-0 rounded-lg'
        loading='lazy'
        sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px'
      />
      <div className='absolute inset-0 bg-black rounded-lg opacity-60 z-5' />
      <div className='relative z-10 flex flex-col h-full text-left text-light-gray'>
        <div className='flex-grow'>
          <h3 className='mb-2 font-sans text-base font-semibold underline md:text-lg'>{title}</h3>
          <p className='mb-2 text-base font-bold text-right md:text-lg font-roboto text-turquoise text-shadow'>
            {price}
          </p>
          <p className='mb-2 font-sans text-sm'>{description}</p>
        </div>
        <div className='mb-4 text-right md:mb-2'>
          <CTAButton
            label='¡Reserva!'
            className='px-2 py-1 font-sans text-xs font-semibold transition-all duration-200 ease-in-out rounded-md md:text-sm text-navy-blue bg-turquoise hover:bg-opacity-80'
          />
        </div>
      </div>
    </div>
  );
};
