import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { testimonials } from '@/data';
import { CustomArrow, SectionIntro, StarRating, TestimonialCard } from '@/components';
import { useWindowSize } from '@/hooks';

import { AiFillSafetyCertificate } from 'react-icons/ai';
import { useState } from 'react';

const title = 'Experiencias de QuiroJairoTerapia';
const description =
  'QuiroJairoTerapia ha ayudado a muchas personas a encontrar alivio y bienestar. Estas son algunas de las experiencias de nuestros clientes.';

export const Experiences = () => {
  const windowSize = useWindowSize();
  const slidePercentage = windowSize.width >= 768 ? 33.33 : 100;
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  const formattedAverage = averageRating.toFixed(1);

  const [expandedTestimonialId, setExpandedTestimonialId] = useState<string>('');

  const last50Testimonials = testimonials.slice(-50);

  return (
    <div className='container px-4 py-16 mx-auto text-left select-none md:px-8 lg:px-16'>
      <SectionIntro title={title} description={description} />
      <div className='flex flex-row items-center mb-8 text-center md:text-left'>
        <div className='inline-block mr-2 font-sans'>
          <StarRating rating={averageRating} />
        </div>
        <div className='inline-block font-sans text-2xl font-bold text-light-gray'>{formattedAverage}</div>
        <AiFillSafetyCertificate size={24} className='ml-2' />
      </div>
      <Carousel
        className='mb-8 overflow-visible'
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        // autoPlay
        // interval={3000}
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
        {last50Testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.commentId}
            testimonial={testimonial}
            expandedTestimonialId={expandedTestimonialId}
            setExpandedTestimonialId={setExpandedTestimonialId}
          />
        ))}
      </Carousel>
    </div>
  );
};
