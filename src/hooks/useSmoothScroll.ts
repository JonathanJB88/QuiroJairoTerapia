import { IMenuItem, Id } from '@/interfaces';
import { useState, useEffect } from 'react';

export const useSmoothScroll = (menuItems: IMenuItem[]) => {
  const [activeSection, setActiveSection] = useState(menuItems[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = menuItems[0].id;
      const headerHeight = document.querySelector('header')?.clientHeight || 0;

      menuItems.forEach((item) => {
        const element = document.getElementById(item.id) as HTMLElement;
        if (!element) return;
        const rect = element.getBoundingClientRect();

        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuItems]);

  const scrollToSection = (id: Id) => {
    const element = document.getElementById(id);
    const headerHeight = document.querySelector('header')?.clientHeight || 0;
    const topOffset = element?.getBoundingClientRect().top || 0;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (element) {
      window.scrollTo({
        top: scrollTop + topOffset - headerHeight,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return { activeSection, isMenuOpen, scrollToSection, toggleMenu };
};
