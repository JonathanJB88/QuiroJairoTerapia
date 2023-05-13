import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { AdminButtons, StarRating } from '@/components';
import { formatDate } from '@/helpers';
import { Comment } from '@/store';

export interface CommentToUpdate {
  commentId: string;
  approved: boolean;
}

interface ReviewCardProps {
  review: Comment;
  expandedReviewId: string;
  setExpandedReviewId: Dispatch<SetStateAction<string>>;
}

export const ReviewCard = ({ review, expandedReviewId, setExpandedReviewId }: ReviewCardProps) => {
  const {
    rating,
    createdAt,
    content,
    userId: { name: username },
    commentId,
    approved,
  } = review;

  const handleClick = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    setExpandedReviewId(expandedReviewId === id ? '' : id);
  };

  const isExpanded = expandedReviewId === commentId;

  const modalStyle = isExpanded
    ? 'absolute top-0 p-6 w-full bg-light-gray h-full rounded-lg shadow-xl cursor-pointer z-50 overflow-y-auto'
    : 'hidden';

  return (
    <div className='relative'>
      <div
        className='flex flex-col justify-between h-full p-4 mx-8 rounded-lg shadow-xl cursor-pointer md:p-8 bg-light-gray'
        onClick={handleClick(commentId)}
      >
        <div className='flex flex-col h-32 space-y-2 font-sans text-left text-navy-blue'>
          <div className='flex items-center justify-between'>
            <div>
              <StarRating rating={rating} readOnly />
            </div>
            <div>
              <AiFillSafetyCertificate size={20} />
            </div>
          </div>
          <p className='text-xs'>{formatDate(createdAt)}</p>
          <p className='flex-grow text-sm line-clamp-2'>{content}</p>
          <p className='text-sm text-blue-500'>Leer más</p>
        </div>
        <p className='text-sm font-semibold text-right'>- {username}</p>
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
          <p className='flex-grow text-sm'>{content}</p>
          <p className='text-sm text-blue-500'>Mostrar menos</p>
        </div>
        <p className='text-sm font-semibold text-right'>- {username}</p>
        <AdminButtons commentId={commentId} approved={approved} />
      </div>
    </div>
  );
};
