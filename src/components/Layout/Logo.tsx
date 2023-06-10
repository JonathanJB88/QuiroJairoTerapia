import Image from 'next/image';

export const Logo = () => {
  return (
    <>
      <div className='relative w-16 h-16 mx-2'>
        <Image
          src='/images/quirojairoterapialogo.jpeg'
          alt='QuiroJairoTerapia'
          style={{ filter: 'drop-shadow(0 0 1px black)', objectFit: 'cover' }}
          loading='lazy'
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px'
        />
      </div>

      <div className='flex flex-col'>
        <span className='mb-1 text-xl select-none text-navy-blue font-roboto'>
          QuiroJairoTerapia
        </span>
        <span className='text-sm select-none text-navy-blue font-roboto'>
          Alivio y bienestar en tus manos
        </span>
      </div>
    </>
  );
};
