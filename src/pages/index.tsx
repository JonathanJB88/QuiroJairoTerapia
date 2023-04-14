import { NextPage } from 'next';
import { Contact, CustomHead, Footer, Hero, Navbar, Services } from '@/components';
import { IMenuItem, Id, LabelMap } from '@/interfaces';
import { useSmoothScroll } from '@/hooks';

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

  const pageTitle = getTitle(activeSection);
  const pageDescription = `Descubre la sección ${activeSection} en QuiroJairoTerapia y encuentra el alivio y bienestar que buscas.`;

  return (
    <div className='flex flex-col min-h-screen'>
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
          <div className='px-4 mx-auto text-white md:px-8 lg:px-16 xl:max-w-5xl bg-navy-blue'>
            <h1 className='text-4xl font-roboto'>Conoce al terapeuta</h1>
            <p className='font-sans text-lg text-turquoise'>Alivio y bienestar en tus manos</p>
          </div>
        </section>

        <section id='experiencias' className='flex items-center justify-center w-full min-vh-screen'>
          <div className='px-4 mx-auto text-white md:px-8 lg:px-16 xl:max-w-5xl bg-navy-blue'>
            <h1 className='text-4xl font-roboto'>Experiencias</h1>
            <p className='font-sans text-lg text-turquoise'>Alivio y bienestar en tus manos</p>
          </div>
        </section>

        <section id='consejos' className='flex items-center justify-center w-full min-vh-screen'>
          <div className='px-4 mx-auto text-white md:px-8 lg:px-16 xl:max-w-5xl bg-navy-blue'>
            <h1 className='text-4xl font-roboto'>Consejos</h1>
            <p className='font-sans text-lg text-turquoise'>Alivio y bienestar en tus manos</p>
          </div>
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
