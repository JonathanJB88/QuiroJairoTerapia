export const nameValidator = {
  validator: (value: string) => value.trim().length > 2,
  message: 'Tu nombre debe tener al menos 3 caracteres',
};

export const emailValidator = {
  validator: (value: string) => /\S+@\S+\.\S+/.test(value),
  message: 'Ingresa un correo electrónico válido',
};

export const passwordValidator = {
  validator: (value: string) => value.length >= 6,
  message: 'La contraseña debe tener al menos 6 caracteres',
};
