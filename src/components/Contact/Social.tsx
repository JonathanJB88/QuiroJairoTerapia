import { IconType } from 'react-icons';

interface SocialProps {
  Icon: IconType;
  href: string;
}

export const Social = ({ Icon, href }: SocialProps) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='transition-all duration-200 ease-in-out text-turquoise hover:text-navy-blue'
    >
      <Icon size={32} />
    </a>
  );
};
