import { useEffect, useMemo, useState } from 'react';

type FormValidators<T> = {
  [key in keyof T]?: [(value: T[key]) => boolean, string];
};

type FormState<T> = {
  [key in keyof T]: T[key];
};

export const useForm = <T extends FormState<T>>(
  initialForm: T = {} as T,
  formValidations: FormValidators<T> = {} as FormValidators<T>
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<Partial<Record<keyof T, string | null>>>(
    {} as Partial<Record<keyof T, string | null>>
  );

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue as keyof T] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name as keyof T]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: Partial<Record<keyof T, string | null>> = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField as keyof T]!;

      formCheckedValues[`${formField}Valid` as keyof T] = fn(formState[formField as keyof T]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
