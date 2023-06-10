import { cloneElement } from 'react';

interface ContactItemProps {
  icon: React.ReactElement;
  type: 'mail' | 'whatsapp';
  contact: string;
}

export const ANCHOR_CLASS =
  'flex items-center justify-start text-navy-blue hover:text-turquoise transition-all duration-200 ease-in-out';

export const ContactItem = ({ icon, type, contact }: ContactItemProps) => {
  const link =
    type === 'mail' ? `mailto:${contact}` : `https://wa.me/${contact}`;
  return (
    <div className='font-sans text-sm italic md:text-base'>
      <a
        href={link}
        className={ANCHOR_CLASS}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={link}
      >
        {cloneElement(icon, {
          className: 'w-5 h-5 mx-1',
        })}
        <span className='font-medium'>{contact}</span>
      </a>
    </div>
  );
};
