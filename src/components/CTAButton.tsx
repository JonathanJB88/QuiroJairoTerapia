import { useCallback } from 'react';
import { Emoji } from '@/components';

const calendlyConfig = {
  url: process.env.NEXT_PUBLIC_CALENDLY_URL as string,
  text: '¡Reserva tu cita ahora!',
  color: '#1c3d5a',
  textColor: '#ffffff',
  branding: false,
};

interface CTAButtonProps {
  label: string;
  className?: string;
}

const defaultClassName =
  'px-4 py-1 font-sans font-semibold rounded-md text-navy-blue bg-turquoise md:px-8 md:py-2 hover:bg-opacity-80';

export const CTAButton = ({ label, className = defaultClassName }: CTAButtonProps) => {
  const handleButtonClick = useCallback(() => {
    window.Calendly.initPopupWidget(calendlyConfig);
  }, []);
  return (
    <button onClick={handleButtonClick} className={className}>
      {label} <Emoji label='calendar' symbol='📅' />
      <Emoji label='pointing right' symbol='👉' />
    </button>
  );
};
