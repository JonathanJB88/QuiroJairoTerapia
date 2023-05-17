import { ReactNode } from 'react';

interface MyLinkProps {
  href: string;
  children: ReactNode;
}

export const MyLink = ({ href, children }: MyLinkProps) => {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className='font-sans font-medium underline text-navy-blue'>
      {children}
    </a>
  );
};
