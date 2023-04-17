import Image from 'next/image';

interface TestimonialProps {
  imageUrl: string;
  name: string;
  message: string;
  bgStyle: string;
}

export const Testimonial = ({ imageUrl, name, message, bgStyle }: TestimonialProps) => (
  <div className={`p-6 rounded-lg shadow-md text-light-gray transition-all duration-300 ${bgStyle}`}>
    <div className='flex flex-col items-center'>
      <div className='w-16 h-16 mb-4 overflow-hidden rounded-full'>
        <Image src={imageUrl} width={64} height={64} alt={`${name} testimonial`} />
      </div>
      <h5 className='mb-1 text-lg font-semibold md:text-xl font-roboto'>{name}</h5>
    </div>
    <p className='mt-2 font-sans text-sm text-center md:text-base'>{message}</p>
  </div>
);
