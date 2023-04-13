import { Emoji, HeaderHeroText, ListItem } from '@/components';

export const Hero = () => {
  return (
    <div className='flex items-center justify-center h-full min-h-screen'>
      <video
        className='absolute inset-0 object-cover w-full h-full'
        src='/videos/quirojairomasaje.mp4'
        autoPlay
        muted
        loop
      />
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='z-10 flex flex-col items-center justify-center px-4 -mt-12 space-y-6 text-center text-white select-none lg:text-left lg:items-start md:space-y-6 md:px-8 lg:px-16'>
        <h1 className='text-lg font-bold font-roboto md:text-2xl'>
          <HeaderHeroText />
          <Emoji label='massaging' symbol='💆‍♂️' />
          <Emoji label='sparkles' symbol='✨' />
        </h1>
        <p className='py-1 font-sans text-sm leading-relaxed text-white md:text-lg'>
          Despierta tus sentidos y libera tu cuerpo del estrés con los tratamientos especializados de Jairo, el experto
          en quiromasaje que te ayudará a recuperar la armonía y el bienestar que te mereces.{' '}
          <Emoji label='star' symbol='🌟' />
          <Emoji label='raising hands' symbol='🙌' />
        </p>
        <ul className='flex flex-col space-y-2 text-left text-white md:space-y-4'>
          <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Alivio del dolor muscular' />
          <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Reducción de tensiones' />
          <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Mejora la circulación sanguínea' />
          <ListItem emoji={{ label: 'blue small square', symbol: '🔹' }} text='Estimulación del sistema linfático' />
        </ul>
        <div className='mt-6' />
        <button className='px-4 py-1 font-sans font-semibold rounded-md text-navy-blue bg-turquoise md:px-8 md:py-2 hover:bg-opacity-80'>
          ¡Reserva tu cita ahora! <Emoji label='calendar' symbol='📅' />
          <Emoji label='pointing right' symbol='👉' />
        </button>
      </div>
    </div>
  );
};
