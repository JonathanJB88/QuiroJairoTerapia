export interface IMenuItem {
  id: Id;
  label: Label;
}

export type Id = 'inicio' | 'servicios' | 'conoce-al-terapeuta' | 'experiencias' | 'consejos' | 'contacto';
export type Label = 'Inicio' | 'Servicios' | 'Conoce al terapeuta' | 'Experiencias' | 'Consejos' | 'Contacto';

export type LabelMap = {
  [key in Id]: Label;
};

export type Content = { title: string; text: string | JSX.Element };

export interface Iservice {
  title: string;
  price: string;
  description: string;
  backgroundImageUrl: string;
}

export interface InputFieldType {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null | undefined;
  minLength?: number;
  display?: boolean;
  ref?: React.RefObject<HTMLTextAreaElement>;
}
