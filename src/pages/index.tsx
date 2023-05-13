import { NextPage } from 'next';
import { Contact, CustomHead, Experiences, Footer, Hero, Navbar, Services } from '@/components';
import { IMenuItem, Id, LabelMap } from '@/interfaces';
import { useAuthStore, useSmoothScroll } from '@/hooks';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const menuItems: IMenuItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'conoce-al-terapeuta', label: 'Conoce al terapeuta' },
  { id: 'experiencias', label: 'Experiencias' },
  { id: 'consejos', label: 'Consejos' },
  { id: 'contacto', label: 'Contacto' },
];

const labelMap: LabelMap = {
  inicio: 'Inicio',
  servicios: 'Servicios',
  'conoce-al-terapeuta': 'Conoce al terapeuta',
  experiencias: 'Experiencias',
  consejos: 'Consejos',
  contacto: 'Contacto',
};

const getTitle = (activeSection: Id): string => {
  return `${labelMap[activeSection]} - QuiroJairoTerapia`;
};

const HomePage: NextPage = () => {
  const { activeSection, isMenuOpen, scrollToSection, toggleMenu } = useSmoothScroll(menuItems);
  const { checkAuthToken } = useAuthStore();

  const pageTitle = getTitle(activeSection);
  const pageDescription = `Descubre la sección ${activeSection} en QuiroJairoTerapia y encuentra el alivio y bienestar que buscas.`;

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Toaster />
      <CustomHead title={pageTitle} description={pageDescription} />
      <Navbar
        activeSection={activeSection}
        handleClick={scrollToSection}
        menuItems={menuItems}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <main className='flex-grow'>
        <section id='inicio' className='flex items-center justify-center w-full min-vh-screen'>
          <Hero />
        </section>

        <section id='servicios' className='flex items-center justify-center w-full min-vh-screen'>
          <Services />
        </section>

        <section id='conoce-al-terapeuta' className='flex items-center justify-center w-full min-vh-screen'>
          {/* Sección sobre mí con información del terapeuta - Jairo */}
        </section>

        <section id='experiencias' className='flex items-center justify-center w-full min-vh-screen'>
          <Experiences />
        </section>

        <section id='consejos' className='flex items-center justify-center w-full min-vh-screen'>
          {/* Consejos para el cuidado de la salud - Blog */}
        </section>

        <section id='contacto' className='flex items-center justify-center w-full min-vh-screen'>
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
