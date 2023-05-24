import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { CustomArrow, SectionIntro, StarRating, ReviewCard, CommentBox } from '@/components';
import { useAuthStore, useCommentStore, useReviewData, useWindowSize } from '@/hooks';
import { toastNotification } from '@/helpers';

const title = 'Experiencias de QuiroJairoTerapia';
const description =
  'QuiroJairoTerapia ha ayudado a muchas personas a encontrar alivio y bienestar. Estas son algunas de las experiencias de nuestros clientes.';

export const Experiences = () => {
  const windowSize = useWindowSize();
  const slidePercentage = windowSize.width >= 768 ? 33.33 : 100;
  const { user } = useAuthStore();
  const { comments, errorMessage, getComments } = useCommentStore();
  const { averageRating, formattedAverage, recentReviews } = useReviewData(user, comments);

  const [expandedReviewId, setExpandedReviewId] = useState<string>('');

  useEffect(() => {
    if (errorMessage !== undefined) {
      toastNotification('error', errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    getComments('review');
  }, [getComments]);

  return (
    <div className='container px-4 mx-auto mb-10 text-left select-none md:mb-5 md:px-8 lg:px-16'>
      <SectionIntro title={title} description={description} />
      <div className='flex flex-row items-center mb-4 text-center md:text-left'>
        <div className='inline-block mr-2 font-sans'>
          <StarRating rating={averageRating} readOnly />
        </div>
        <div className='inline-block font-sans text-2xl font-bold text-light-gray'>{formattedAverage}</div>
        <AiFillSafetyCertificate size={24} className='ml-2' />
      </div>
      <Carousel
        key={recentReviews.length}
        className='mb-8 overflow-visible'
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        useKeyboardArrows
        stopOnHover
        centerMode
        centerSlidePercentage={slidePercentage}
        renderArrowPrev={(clickHandler, hasPrev, label) => (
          <CustomArrow clickHandler={clickHandler} hasArrow={hasPrev} label={label} />
        )}
        renderArrowNext={(clickHandler, hasNext, label) => (
          <CustomArrow clickHandler={clickHandler} hasArrow={hasNext} label={label} />
        )}
      >
        {recentReviews.map((review) => (
          <ReviewCard
            key={review.commentId}
            review={review}
            expandedReviewId={expandedReviewId}
            setExpandedReviewId={setExpandedReviewId}
          />
        ))}
      </Carousel>
      <CommentBox />
    </div>
  );
};
