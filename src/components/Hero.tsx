import { Emoji, HeaderHeroText, ListItem, CTAButton } from '@/components';

export const Hero = () => {
  const heroText = (
    <h1 className='text-lg font-bold font-roboto md:text-2xl'>
      <HeaderHeroText />
      <Emoji label='massaging' symbol='💆‍♂️' />
      <Emoji label='sparkles' symbol='✨' />
    </h1>
  );

  const heroDescription = (
    <p className='py-1 font-sans text-sm leading-relaxed text-white md:text-lg'>
      Despierta tus sentidos y libera tu cuerpo del estrés con los tratamientos especializados de Jairo, el experto en
      quiromasaje que te ayudará a recuperar la armonía y el bienestar que te mereces.{' '}
      <Emoji label='star' symbol='🌟' />
      <Emoji label='raising hands' symbol='🙌' />
    </p>
  );

  const benefitsList = (
    <ul className='flex flex-col space-y-2 font-sans text-left text-white md:space-y-4'>
      <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Alivio del dolor muscular' />
      <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Reducción de tensiones' />
      <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Mejora la circulación sanguínea' />
      <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Estimulación del sistema linfático' />
    </ul>
  );

  return (
    <div className='flex items-center justify-center h-full min-h-screen'>
      <video
        className='absolute inset-0 object-cover w-full h-full'
        src='/videos/quirojairoterapia.mp4'
        autoPlay
        muted
        loop
      />
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='z-10 flex flex-col items-center justify-center px-4 -mt-12 space-y-6 text-center text-white select-none lg:text-left lg:items-start md:space-y-6 md:px-8 lg:px-16'>
        {heroText}
        {heroDescription}
        {benefitsList}
        <div className='mt-6' />
        <CTAButton label='¡Reserva tu cita ahora!' />
      </div>
    </div>
  );
};
