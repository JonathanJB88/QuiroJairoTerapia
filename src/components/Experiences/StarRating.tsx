import { useCallback } from 'react';

interface StarRatingProps {
  rating: number;
  readOnly: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  readOnly,
  onRatingChange = () => {},
}: StarRatingProps) => {
  const handleClick = useCallback(
    (newRating: number) => {
      if (!readOnly) {
        onRatingChange(newRating);
      }
    },
    [readOnly, onRatingChange]
  );

  const percentageRating = (rating % 1) * 100;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starRating = i + 1;
    return (
      <div
        key={starRating}
        className='relative inline-block w-6 h-6 text-xl text-gray-300 cursor-pointer'
        onClick={() => handleClick(starRating)}
        aria-label={`Rate ${starRating} out of 5`}
      >
        <span className='absolute inset-0'>&#9733;</span>
        {starRating <= Math.floor(rating) && (
          <span className='absolute inset-0 text-yellow-500'>&#9733;</span>
        )}
        {starRating === Math.ceil(rating) && (
          <span
            className='absolute inset-0 text-yellow-500'
            style={{
              clipPath: `polygon(0 0, ${percentageRating}% 0, ${percentageRating}% 100%, 0 100%)`,
            }}
          >
            &#9733;
          </span>
        )}
      </div>
    );
  });

  return <>{stars}</>;
};
