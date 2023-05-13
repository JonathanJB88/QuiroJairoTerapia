import Image from 'next/image';
import { useAuthStore, useAuthentication, useUIStore } from '@/hooks';
import { InputField } from '@/components';
import { InputFieldType } from '@/interfaces';

export type AuthFormType = 'login' | 'register';

interface FormProps {
  toogleIsFlipped: () => void;
  type: AuthFormType;
}

export const AuthForm = ({ type, toogleIsFlipped }: FormProps) => {
  const {
    loginEmail,
    loginPassword,
    loginFormValidation,
    onLoginInputChange,
    onResetLoginForm,
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    registerFormValidation,
    onRegisterInputChange,
    onResetRegisterForm,
    formSubmit,
  } = useAuthentication(type);
  const { status } = useAuthStore();
  const { toggleAuthModal } = useUIStore();

  const isLogin = type === 'login';

  const inputFields: InputFieldType[] = [
    {
      name: 'registerName',
      type: 'text',
      placeholder: 'Nombre',
      minLength: 3,
      value: registerName,
      onChange: onRegisterInputChange,
      error: registerFormValidation.registerName,
      display: !isLogin,
    },
    {
      name: 'registerEmail',
      type: 'email',
      placeholder: 'Correo electrónico',
      value: registerEmail,
      onChange: onRegisterInputChange,
      error: registerFormValidation.registerEmail,
      display: !isLogin,
    },
    {
      name: 'loginEmail',
      type: 'email',
      placeholder: 'Correo electrónico',
      value: loginEmail,
      onChange: onLoginInputChange,
      error: loginFormValidation.loginEmail,
      display: isLogin,
    },
    {
      name: 'registerPassword',
      type: 'password',
      placeholder: 'Contraseña',
      minLength: 6,
      value: registerPassword,
      onChange: onRegisterInputChange,
      error: registerFormValidation.registerPassword,
      display: !isLogin,
    },
    {
      name: 'loginPassword',
      type: 'password',
      placeholder: 'Contraseña',
      value: loginPassword,
      onChange: onLoginInputChange,
      error: loginFormValidation.loginPassword,
      display: isLogin,
    },
    {
      name: 'registerConfirmPassword',
      type: 'password',
      placeholder: 'Confirmar contraseña',
      minLength: 6,
      value: registerConfirmPassword,
      onChange: onRegisterInputChange,
      error: registerFormValidation.registerConfirmPassword,
      display: !isLogin,
    },
  ];

  const h2 = isLogin ? 'Acceder para dejar una reseña' : 'Registrarse y dejar una reseña';
  const button = isLogin ? 'Acceder' : 'Registrarse';
  const ctaButton = isLogin ? '¿No tienes una cuenta?, Regístrate' : '¿Ya tienes una cuenta?, Accede';
  const buttonText = status === 'checking' ? 'Validando...' : button;

  const handleFlipResetForm = () => {
    if (isLogin) onResetLoginForm();
    else onResetRegisterForm();
    toogleIsFlipped();
  };

  return (
    <div className='p-4 bg-light-gray rounded-xl'>
      <button className='absolute top-0 right-0 mt-2 mr-4 text-xl font-semibold' onClick={toggleAuthModal}>
        &times;
      </button>
      <div className='flex flex-col items-center mb-4'>
        <Image width={120} height={120} src='/images/quirojairoterapialogo.jpeg' alt='Logo' className='mb-3' />
        <h2 className='font-bold text-navy-blue font-roboto'>{h2}</h2>
      </div>
      <form onSubmit={formSubmit} noValidate>
        {inputFields.map(
          (inputField) =>
            inputField.display && (
              <InputField
                key={inputField.name}
                name={inputField.name}
                type={inputField.type}
                placeholder={inputField.placeholder}
                minLength={inputField.minLength}
                value={inputField.value}
                onChange={inputField.onChange}
                error={inputField.error}
              />
            )
        )}
        <button
          className='w-full py-2 mt-3 font-sans font-semibold transition-all duration-200 ease-in-out rounded-md text-navy-blue bg-turquoise hover:bg-opacity-80'
          type='submit'
        >
          {buttonText}
        </button>
      </form>

      <div className='flex justify-end mt-4'>
        <button
          className='font-sans text-xs underline transition-all duration-200 ease-in-out text-navy-blue md:text-sm hover:text-opacity-80'
          onClick={handleFlipResetForm}
        >
          {ctaButton}
        </button>
      </div>
    </div>
  );
};
