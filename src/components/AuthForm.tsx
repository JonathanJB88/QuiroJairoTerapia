import Image from 'next/image';

interface FormProps {
  toogleIsFlipped: () => void;
  type: 'login' | 'register';
  toggleAuthModal: () => void;
}

export const AuthForm = ({ type, toogleIsFlipped, toggleAuthModal }: FormProps) => {
  const isLogin = type === 'login';
  const h2 = isLogin ? 'Acceder para dejar una reseña' : 'Registrarse y dejar una reseña';
  const button = isLogin ? 'Acceder' : 'Registrarse';
  const ctaButton = isLogin ? 'Registrarse' : 'Acceder';

  return (
    <div className='p-4 bg-light-gray rounded-xl'>
      <button className='absolute top-0 right-0 mt-2 mr-4 text-xl font-semibold' onClick={toggleAuthModal}>
        &times;
      </button>
      <div className='flex flex-col items-center mb-4'>
        <Image width={120} height={120} src='/images/quirojairoterapialogo.jpeg' alt='Logo' className='mb-3' />
        <h2 className='font-bold text-navy-blue font-roboto'>{h2}</h2>
      </div>
      <form>
        {!isLogin && (
          <div className='mb-2'>
            <input
              type='text'
              placeholder='Nombre'
              className='w-full p-2 font-sans bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500'
            />
          </div>
        )}
        <div className='mb-2'>
          <input
            type='email'
            placeholder='Correo electrónico'
            className='w-full p-2 font-sans bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-2'>
          <input
            type='password'
            placeholder='Contraseña'
            className='w-full p-2 font-sans bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        {!isLogin && (
          <div className='mb-2'>
            <input
              type='password'
              placeholder='Confirmar contraseña'
              className='w-full p-2 font-sans bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500'
            />
          </div>
        )}
        <button className='w-full py-2 mt-3 font-sans font-semibold rounded-md text-navy-blue bg-turquoise hover:bg-opacity-80'>
          {button}
        </button>
      </form>

      <div className='flex justify-end mt-4'>
        <button className='font-sans text-xs underline text-navy-blue md:text-sm' onClick={toogleIsFlipped}>
          {ctaButton}
        </button>
      </div>
    </div>
  );
};
