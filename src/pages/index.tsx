import { useEffect, useRef } from 'react';
import { GetStaticProps, NextPage } from 'next';
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
  Therapist,
} from '@/components';
import { useAuthStore, useSmoothScroll } from '@/hooks';
import { getAllPosts } from '@/lib';
import {
  IMenuItem,
  LabelMap,
  MenuItems,
  MenuLabels,
  Post,
  SectionRefs,
} from '@/interfaces';

export const menuItems: IMenuItem[] = [
  { id: MenuItems.INICIO, label: MenuLabels.INICIO },
  { id: MenuItems.SERVICIOS, label: MenuLabels.SERVICIOS },
  { id: MenuItems.CONOCE_AL_TERAPEUTA, label: MenuLabels.CONOCE_AL_TERAPEUTA },
  { id: MenuItems.EXPERIENCIAS, label: MenuLabels.EXPERIENCIAS },
  { id: MenuItems.CONSEJOS, label: MenuLabels.CONSEJOS },
  { id: MenuItems.CONTACTO, label: MenuLabels.CONTACTO },
];

const labelMap: LabelMap = {
  [MenuItems.INICIO]: MenuLabels.INICIO,
  [MenuItems.SERVICIOS]: MenuLabels.SERVICIOS,
  [MenuItems.CONOCE_AL_TERAPEUTA]: MenuLabels.CONOCE_AL_TERAPEUTA,
  [MenuItems.EXPERIENCIAS]: MenuLabels.EXPERIENCIAS,
  [MenuItems.CONSEJOS]: MenuLabels.CONSEJOS,
  [MenuItems.CONTACTO]: MenuLabels.CONTACTO,
};

const getTitle = (activeSection: MenuItems): string => {
  return `${labelMap[activeSection]} - QuiroJairoTerapia`;
};

interface HomePageProps {
  posts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  const { checkAuthToken } = useAuthStore();

  const headerRef = useRef<HTMLHeadingElement>(null);
  const sectionRefs: SectionRefs = {
    [MenuItems.INICIO]: useRef<HTMLElement>(null),
    [MenuItems.SERVICIOS]: useRef<HTMLElement>(null),
    [MenuItems.CONOCE_AL_TERAPEUTA]: useRef<HTMLElement>(null),
    [MenuItems.EXPERIENCIAS]: useRef<HTMLElement>(null),
    [MenuItems.CONSEJOS]: useRef<HTMLElement>(null),
    [MenuItems.CONTACTO]: useRef<HTMLElement>(null),
  };

  const { activeSection, isMenuOpen, scrollToSection, setIsMenuOpen } =
    useSmoothScroll({
      menuItems,
      sectionRefs,
      headerRef,
    });

  const pageTitle = getTitle(activeSection);
  const pageDescription = `Descubre la sección ${activeSection} en QuiroJairoTerapia y encuentra el alivio y bienestar que buscas.`;

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return (
    <div className='flex flex-col min-vh-screen'>
      <Toaster />
      <CustomHead title={pageTitle} description={pageDescription} />
      <Navbar
        menuItems={menuItems}
        headerRef={headerRef}
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        handleClick={scrollToSection}
      />
      <main className='flex-grow'>
        <section
          ref={sectionRefs.inicio}
          id={MenuItems.INICIO}
          className='flex flex-col justify-start w-full py-4'
        >
          <Hero />
        </section>

        <section
          ref={sectionRefs.servicios}
          id={MenuItems.SERVICIOS}
          className='flex flex-col justify-start w-full py-4'
        >
          <Services />
        </section>

        <section
          ref={sectionRefs['conoce-al-terapeuta']}
          id={MenuItems.CONOCE_AL_TERAPEUTA}
          className='flex flex-col justify-start w-full py-4'
        >
          <Therapist />
        </section>

        <section
          ref={sectionRefs.experiencias}
          id={MenuItems.EXPERIENCIAS}
          className='flex flex-col justify-start w-full py-4'
        >
          <Experiences />
        </section>

        <section
          ref={sectionRefs.consejos}
          id={MenuItems.CONSEJOS}
          className='flex flex-col justify-start w-full py-4'
        >
          <Blog posts={posts} scrollToSection={scrollToSection} />
        </section>

        <section
          ref={sectionRefs.contacto}
          id={MenuItems.CONTACTO}
          className='relative flex flex-col justify-start w-full py-4'
        >
          <Contact />
          <ScrollToTopButton
            onClick={() => scrollToSection(MenuItems.INICIO)}
          />
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
