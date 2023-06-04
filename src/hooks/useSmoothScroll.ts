import { useState, useEffect, useCallback, RefObject } from 'react';
import { scroller } from 'react-scroll';
import { IMenuItem, MenuItems, SectionRefs } from '@/interfaces';

interface HookProps {
  menuItems: IMenuItem[];
  sectionRefs: SectionRefs;
  headerRef: RefObject<HTMLHeadingElement>;
}

export const useSmoothScroll = ({ menuItems, sectionRefs, headerRef }: HookProps) => {
  const [activeSection, setActiveSection] = useState<MenuItems>(menuItems[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = useCallback(
    (id: MenuItems) => {
      setIsMenuOpen(false);

      const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;
      const element = sectionRefs[id]?.current;

      if (element && headerHeight) {
        scroller.scrollTo(id, { offset: -headerHeight, smooth: true });

        setActiveSection(id);
        localStorage.setItem('activeSection', id);
      }
    },
    [headerRef, sectionRefs]
  );

  const onIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newActiveSection = entry.target.id as MenuItems;
          setActiveSection(newActiveSection);
          localStorage.setItem('activeSection', newActiveSection);
        }
      });
    },
    [setActiveSection]
  );

  const handleScroll = useCallback(() => {
    if (window.pageYOffset === 0) {
      setActiveSection(MenuItems.INICIO);
      localStorage.setItem('activeSection', MenuItems.INICIO);
    }
  }, [setActiveSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.75 });

    menuItems.forEach((item) => {
      const element = sectionRefs[item.id]?.current;
      if (element) observer.observe(element);
    });

    return () => {
      menuItems.forEach((item) => {
        const element = sectionRefs[item.id]?.current;
        if (element) observer.unobserve(element);
      });
    };
  }, [menuItems, sectionRefs, onIntersect]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const lastActiveSection = localStorage.getItem('activeSection');
    if (lastActiveSection) {
      scrollToSection(lastActiveSection as MenuItems);
    }
  }, [setActiveSection]);

  return { activeSection, isMenuOpen, setIsMenuOpen, scrollToSection };
};
