import { toastNotification, nameValidator, emailValidator, passwordValidator } from '@/helpers';
import { FormValidators, useAuthStore, useForm } from '@/hooks';
import { AuthFormType } from '@/components';

interface LoginFormFields {
  loginEmail: string;
  loginPassword: string;
}

interface RegisterFormFields {
  registerName: string;
  registerEmail: string;
  registerPassword: string;
  registerConfirmPassword: string;
}

const initialLoginFormFields: LoginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const initialRegisterFormFields: RegisterFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
};

const loginFormValidations: FormValidators<LoginFormFields> = {
  loginEmail: emailValidator,
  loginPassword: passwordValidator,
};

const registerFormValidations: FormValidators<RegisterFormFields> = {
  registerName: nameValidator,
  registerEmail: emailValidator,
  registerPassword: { ...passwordValidator, dependentFields: ['registerConfirmPassword'] },
  registerConfirmPassword: {
    validator: (value: string, state: RegisterFormFields) => value === state.registerPassword,
    message: 'Las contraseñas no coinciden',
    dependentFields: ['registerPassword'],
  },
};

export const useAuthentication = (type: AuthFormType) => {
  const { login, register } = useAuthStore();

  const {
    formState: { loginEmail, loginPassword },
    onInputChange: onLoginInputChange,
    formValidation: loginFormValidation,
    isFormValid: isLoginFormValid,
    onResetForm: onResetLoginForm,
  } = useForm<LoginFormFields>(initialLoginFormFields, loginFormValidations);
  const {
    formState: { registerName, registerEmail, registerPassword, registerConfirmPassword },
    onInputChange: onRegisterInputChange,
    formValidation: registerFormValidation,
    isFormValid: isRegisterFormValid,
    onResetForm: onResetRegisterForm,
  } = useForm<RegisterFormFields>(initialRegisterFormFields, registerFormValidations);

  const handleLoginSubmit = () => {
    if (!loginEmail || !loginPassword) return toastNotification('error', 'Por favor, completa el formulario');
    if (!isLoginFormValid) return toastNotification('error', 'Por favor, valida el formulario');
    return login({ email: loginEmail, password: loginPassword });
  };

  const handleRegisterSubmit = () => {
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword)
      return toastNotification('error', 'Por favor, completa el formulario');
    if (!isRegisterFormValid) return toastNotification('error', 'Por favor, valida el formulario');
    return register({ name: registerName, email: registerEmail, password: registerPassword });
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'login') return handleLoginSubmit();
    return handleRegisterSubmit();
  };

  return {
    // login
    loginEmail,
    loginPassword,
    loginFormValidation,
    onLoginInputChange,
    onResetLoginForm,
    // register
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    registerFormValidation,
    onRegisterInputChange,
    onResetRegisterForm,
    // common
    formSubmit,
  };
};
