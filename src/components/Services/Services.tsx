import { Carousel } from 'react-responsive-carousel';
import { services } from '@/data';
import {
  CustomArrow,
  DiscountPackages,
  ServiceCard,
  SectionIntro,
} from '@/components';
import { useWindowSize } from '@/hooks';

const title = 'Servicios de QuiroJairoTerapia';
const description = `¡Descubre la magia del quiromasaje con QuiroJairoTerapia! Jairo, terapeuta profesional de quiromasaje, te invita
a disfrutar de una experiencia única y transformadora. Nuestros tratamientos están especialmente diseñados para
adaptarse a tus necesidades y preferencias, proporcionando un viaje de bienestar y relajación. Echa un vistazo a
nuestra amplia gama de masajes y terapias:`;

export const Services = () => {
  const windowSize = useWindowSize();
  const slidePercentage = windowSize.width >= 768 ? 33.33 : 100;

  return (
    <div className='container px-4 mx-auto select-none md:px-8 lg:px-16'>
      <SectionIntro title={title} description={description} />
      <Carousel
        className='mb-8 overflow-visible'
        showThumbs={false}
        showStatus={false}
        showIndicators
        autoPlay
        interval={3000}
        infiniteLoop
        useKeyboardArrows
        stopOnHover
        centerMode
        centerSlidePercentage={slidePercentage}
        renderArrowPrev={(clickHanler, hasPrev, label) => (
          <CustomArrow
            clickHandler={clickHanler}
            hasArrow={hasPrev}
            label={label}
          />
        )}
        renderArrowNext={(clickHanler, hasNext, label) => (
          <CustomArrow
            clickHandler={clickHanler}
            hasArrow={hasNext}
            label={label}
          />
        )}
      >
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </Carousel>

      <DiscountPackages />
    </div>
  );
};
