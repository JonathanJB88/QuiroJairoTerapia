import { RefObject } from 'react';

export interface IMenuItem {
  id: MenuItems;
  label: MenuLabels;
}

export enum MenuItems {
  INICIO = 'inicio',
  SERVICIOS = 'servicios',
  CONOCE_AL_TERAPEUTA = 'conoce-al-terapeuta',
  EXPERIENCIAS = 'experiencias',
  CONSEJOS = 'consejos',
  CONTACTO = 'contacto',
}

export enum MenuLabels {
  INICIO = 'Inicio',
  SERVICIOS = 'Servicios',
  CONOCE_AL_TERAPEUTA = 'Conoce al terapeuta',
  EXPERIENCIAS = 'Experiencias',
  CONSEJOS = 'Consejos',
  CONTACTO = 'Contacto',
}

export type LabelMap = {
  [key in MenuItems]: MenuLabels;
};

export type SectionRefs = Record<MenuItems, RefObject<HTMLElement>>;

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
