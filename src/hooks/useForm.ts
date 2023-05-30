import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDebouncedValue } from '@/hooks';

export type FormValidators<T> = {
  [key in keyof T]?: {
    validator: (value: T[key], state: T) => boolean;
    message: string;
    dependentFields?: (keyof T)[];
  };
};

type FormState<T> = {
  [key in keyof T]: T[key];
};

export const useForm = <T extends FormState<T>>(
  initialForm: T = {} as T,
  formValidations: FormValidators<T> = {} as FormValidators<T>
) => {
  const [formState, setFormState] = useState<T>({ ...initialForm });
  const [formValidation, setFormValidation] = useState<Partial<Record<keyof T, string | null>>>(
    {} as Partial<Record<keyof T, string | null>>
  );
  const [lastChangedField, setLastChangedField] = useState<{ name: keyof T; value: T[keyof T] } | null>(null);

  const debouncedValue = useDebouncedValue(lastChangedField, 500);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T], updatedState: T) => {
      if (formValidations[name]) {
        const { validator, message } = formValidations[name]!;
        setFormValidation((prevValidationState) => ({
          ...prevValidationState,
          [name]: validator(value, updatedState) ? null : message,
        }));
      }
    },
    [formValidations]
  );

  useEffect(() => {
    if (debouncedValue !== null) {
      validateField(debouncedValue.name, debouncedValue.value, formState);
    }
  }, [debouncedValue, validateField, formState]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState((prevState) => {
      const updatedState = { ...prevState, [name as keyof T]: value };
      return updatedState;
    });

    setLastChangedField({ name: name as keyof T, value: value as T[keyof T] });
  };

  const onResetForm = () => {
    setFormState(initialForm);
    setFormValidation({} as Partial<Record<keyof T, string | null>>);
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue as keyof T] !== null) return false;
    }
    return true;
  }, [formValidation]);

  return {
    ...formState,
    formState,
    setFormState,
    onInputChange,
    onResetForm,
    ...formValidation,
    formValidation,
    isFormValid,
  };
};
