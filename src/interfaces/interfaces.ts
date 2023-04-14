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
