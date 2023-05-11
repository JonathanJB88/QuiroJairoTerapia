import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { AiFillSafetyCertificate } from 'react-icons/ai';

import { CustomArrow, SectionIntro, StarRating, TestimonialCard, CommentBox } from '@/components';
import { useCommentStore, useWindowSize } from '@/hooks';
import { toastNotification } from '@/helpers';

const title = 'Experiencias de QuiroJairoTerapia';
const description =
  'QuiroJairoTerapia ha ayudado a muchas personas a encontrar alivio y bienestar. Estas son algunas de las experiencias de nuestros clientes.';

export const Experiences = () => {
  const windowSize = useWindowSize();
  const slidePercentage = windowSize.width >= 768 ? 33.33 : 100;

  const { comments, status, errorMessage, getComments } = useCommentStore();
  const averageRating = comments.reduce((sum, c) => sum + c.rating, 0) / comments.length;
  const formattedAverage = averageRating.toFixed(1);

  const [expandedTestimonialId, setExpandedTestimonialId] = useState<string>('');

  const last50Testimonials = comments.slice(-50);

  useEffect(() => {
    if (errorMessage !== undefined) {
      toastNotification('error', errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (status === 'succeeded') {
      toastNotification('success', 'Comentario enviado correctamente');
    }
  }, [status]);

  useEffect(() => {
    getComments('review');
  }, []);

  return (
    <div className='container px-4 mx-auto -mt-16 text-left select-none md:px-8 lg:px-16'>
      <SectionIntro title={title} description={description} />
      <div className='flex flex-row items-center mb-4 text-center md:text-left'>
        <div className='inline-block mr-2 font-sans'>
          <StarRating rating={averageRating} readOnly />
        </div>
        <div className='inline-block font-sans text-2xl font-bold text-light-gray'>{formattedAverage}</div>
        <AiFillSafetyCertificate size={24} className='ml-2' />
      </div>
      <Carousel
        className='mb-8 overflow-visible'
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
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
      <CommentBox />
    </div>
  );
};
