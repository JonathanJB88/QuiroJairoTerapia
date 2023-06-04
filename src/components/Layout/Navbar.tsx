import { RefObject } from 'react';
import { Logo } from '@/components';
import { IMenuItem, MenuItems } from '@/interfaces';

interface NavbarProps {
  headerRef: RefObject<HTMLHeadingElement>;
  activeSection: MenuItems;
  handleClick: (id: MenuItems) => void;
  menuItems: IMenuItem[];
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const Navbar = ({ headerRef, menuItems, activeSection, isMenuOpen, handleClick, toggleMenu }: NavbarProps) => {
  const activeSectionClass = (id: MenuItems) => {
    return activeSection === id ? 'text-turquoise underline' : 'text-navy-blue';
  };

  return (
    <header ref={headerRef} className='sticky top-0 left-0 z-50 w-full py-3 bg-white'>
      <nav className='container flex items-center justify-between mx-auto font-roboto'>
        <button onClick={() => handleClick(MenuItems.INICIO)} className='flex items-center ml-2'>
          <Logo />
        </button>

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
