import { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import {
  Blog,
  ChatButton,
  Contact,
  CustomHead,
  Experiences,
  Footer,
  Hero,
  Navbar,
  ScrollToTopButton,
  Services,
} from '@/components';
import { useAuthStore, useSmoothScroll } from '@/hooks';
import { getAllPosts } from '@/lib';
import { IMenuItem, Id, LabelMap, Post } from '@/interfaces';

export const menuItems: IMenuItem[] = [
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

interface HomePageProps {
  posts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  const { activeSection, isMenuOpen, scrollToSection, toggleMenu } = useSmoothScroll(menuItems);
  const { checkAuthToken } = useAuthStore();
  const { query } = useRouter();

  const pageTitle = getTitle(activeSection);
  const pageDescription = `Descubre la sección ${activeSection} en QuiroJairoTerapia y encuentra el alivio y bienestar que buscas.`;

  useEffect(() => {
    checkAuthToken();
    if (query.section) scrollToSection(query.section as Id);
  }, [checkAuthToken, query.section]);

  return (
    <div className='flex flex-col min-vh-screen'>
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
        <section id='inicio' className='flex flex-col justify-start w-full py-4'>
          <Hero />
        </section>

        <section id='servicios' className='flex flex-col justify-start w-full py-4'>
          <Services />
        </section>

        <section id='conoce-al-terapeuta' className='flex flex-col justify-start w-full py-4'>
          {/* Sección sobre mí con información del terapeuta - Jairo */}
        </section>

        <section id='experiencias' className='flex flex-col justify-start w-full py-4'>
          <Experiences />
        </section>

        <section id='consejos' className='flex flex-col justify-start w-full py-4'>
          <Blog posts={posts} scrollToSection={scrollToSection} />
        </section>

        <section id='contacto' className='relative flex flex-col justify-start w-full py-4'>
          <Contact />
          <ScrollToTopButton onClick={() => scrollToSection('inicio')} />
        </section>
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
