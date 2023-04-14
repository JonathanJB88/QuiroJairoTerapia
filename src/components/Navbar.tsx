import Link from 'next/link';
import Image from 'next/image';
import { IMenuItem, Id } from '@/interfaces';

interface NavbarProps {
  activeSection: Id;
  handleClick: (id: Id) => void;
  menuItems: IMenuItem[];
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const Navbar = ({ menuItems, activeSection, isMenuOpen, handleClick, toggleMenu }: NavbarProps) => {
  const activeSectionClass = (id: Id) => {
    return activeSection === id ? 'text-turquoise underline' : 'text-navy-blue';
  };

  return (
    <header className='sticky top-0 left-0 z-50 w-full py-3 bg-white'>
      <nav className='container flex items-center justify-between mx-auto font-roboto'>
        <Link href='/'>
          <div className='flex items-center space-x-2'>
            <Image
              src='/images/quirojairoterapialogo.png'
              alt='QuiroJairoTerapia'
              width={62}
              height={62}
              className='w-auto h-auto'
            />

            <div className='flex flex-col'>
              <span className='mb-1 text-xl select-none text-navy-blue'>QuiroJairoTerapia</span>
              <span className='text-sm select-none text-navy-blue'>Alivio y bienestar en tus manos</span>
            </div>
          </div>
        </Link>
        <div className='hidden lg:flex'>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`mx-4 list-none cursor-pointer select-none focus:outline-none hover:text-turquoise transition-colors duration-300 ${activeSectionClass(
                item.id
              )}`}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </li>
          ))}
        </div>
        <button className='pr-2 lg:hidden' onClick={toggleMenu} aria-label='Toggle menu'>
          <svg viewBox='0 0 24 24' className='w-6 h-6 fill-current'>
            <path
              fillRule='evenodd'
              d='M4.5 6A1.5 1.5 0 0 1 6 4.5h12a1.5 1.5 0 0 1 0 3h-12A1.5 1.5 0 0 1 4.5 6zm0 6A1.5 1.5 0 0 1 6 10.5h12a1.5 1.5 0 0 1 0 3h-12A1.5 1.5 0 0 1 4.5 12zm0 6A1.5 1.5 0 0 1 6 16.5h12a1.5 1.5 0 0 1 0 3h-12a1.5 1.5 0 0 1-1.5-1.5z'
            />
          </svg>
        </button>
      </nav>
      <nav className={`lg:hidden font-roboto ${isMenuOpen ? 'block' : 'hidden'}`}>
        {menuItems.map((item) => (
          <div key={item.id} className='py-2 bg-white'>
            <li
              className='block w-full mx-4 text-left list-none cursor-pointer select-none text-navy-blue hover:text-turquoise focus:outline-none'
              onClick={() => {
                handleClick(item.id);
                toggleMenu();
              }}
            >
              {item.label}
            </li>
          </div>
        ))}
      </nav>
    </header>
  );
};
