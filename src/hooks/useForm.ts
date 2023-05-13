import { useEffect, useMemo, useState } from 'react';

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

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue as keyof T] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState((prevState) => {
      const updatedState = { ...prevState, [name as keyof T]: value };

      if (formValidations[name as keyof T]?.dependentFields) {
        for (const dependentField of formValidations[name as keyof T]!.dependentFields!) {
          const { validator, message } = formValidations[dependentField]!;
          setFormValidation((prevValidationState) => ({
            ...prevValidationState,
            [dependentField]: validator(updatedState[dependentField], updatedState) ? null : message,
          }));
        }
      }

      return updatedState;
    });

    if (formValidations[name as keyof T]) {
      const { validator, message } = formValidations[name as keyof T]!;
      setFormValidation((prevValidationState) => ({
        ...prevValidationState,
        [name as keyof T]: validator(value as T[keyof T], formState) ? null : message,
      }));
    }
  };

  const onResetForm = () => {
    setFormState(initialForm);
    setFormValidation({} as Partial<Record<keyof T, string | null>>);
  };

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
