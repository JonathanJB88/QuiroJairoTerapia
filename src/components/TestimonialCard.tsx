import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { ITestimonial } from '@/interfaces';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { StarRating } from '@/components';
import { formatDate } from '@/helpers';

interface TestimonialCardProps {
  testimonial: ITestimonial;
  expandedTestimonialId: string;
  setExpandedTestimonialId: Dispatch<SetStateAction<string>>;
}

export const TestimonialCard = ({
  testimonial: { rating, createdAt, content, userId, commentId },
  expandedTestimonialId,
  setExpandedTestimonialId,
}: TestimonialCardProps) => {
  const handleClick = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    setExpandedTestimonialId(expandedTestimonialId === id ? '' : id);
  };

  const isExpanded = expandedTestimonialId === commentId;

  const modalStyle = isExpanded
    ? 'absolute top-0 p-6 w-full bg-light-gray h-full rounded-lg shadow-xl cursor-pointer z-50 overflow-y-auto'
    : 'hidden';

  return (
    <div className='relative'>
      <div
        className='flex flex-col justify-between h-full p-4 mx-8 rounded-lg shadow-xl cursor-pointer md:p-8 bg-light-gray'
        onClick={handleClick(commentId)}
      >
        <div className='flex flex-col h-full space-y-2 font-sans text-left text-navy-blue'>
          <div className='flex items-center justify-between'>
            <div>
              <StarRating rating={rating} readOnly />
            </div>
            <div>
              <AiFillSafetyCertificate size={20} />
            </div>
          </div>
          <p className='text-xs'>{formatDate(createdAt)}</p>
          <p className='text-sm line-clamp-2'>{content}</p>
          <p className='text-sm text-blue-500'>Leer más</p>
          <p className='text-sm font-semibold'>- {userId}</p>
        </div>
      </div>
      <div className={modalStyle} onClick={handleClick(commentId)}>
        <div className='flex flex-col space-y-2 font-sans text-left text-navy-blue'>
          <div className='flex items-center justify-between'>
            <div>
              <StarRating rating={rating} readOnly />
            </div>
            <div>
              <AiFillSafetyCertificate size={20} />
            </div>
          </div>
          <p className='text-xs'>{formatDate(createdAt)}</p>
          <p className='text-sm'>{content}</p>
          <p className='text-sm text-blue-500'>Mostrar menos</p>
          <p className='text-sm font-semibold'>- {userId}</p>
        </div>
      </div>
    </div>
  );
};
