import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { services } from '@/data';
import { CustomArrow, DiscountPackages, ServiceCard, ServicesIntro } from '@/components';
import { useWindowSize } from '@/hooks';

export const Services = () => {
  const windowSize = useWindowSize();
  const slidePercentage = windowSize.width >= 768 ? 33 : 100;

  return (
    <div className='container px-4 mx-auto select-none md:-mt-12 md:px-8 lg:px-16'>
      <ServicesIntro />
      <Carousel
        className='mb-8 overflow-visible carousel-wrapper'
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
          <CustomArrow clickHandler={clickHanler} hasArrow={hasPrev} label={label} />
        )}
        renderArrowNext={(clickHanler, hasNext, label) => (
          <CustomArrow clickHandler={clickHanler} hasArrow={hasNext} label={label} />
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
