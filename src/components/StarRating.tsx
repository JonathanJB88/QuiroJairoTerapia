// interface StarRatingProps {
//   rating: number;
//   readOnly: boolean;
//   onRatingChange?: (rating: number) => void;
// }

// export const StarRating = ({ rating, readOnly, onRatingChange = () => {} }: StarRatingProps) => {
//   const stars = [];
//   const handleClick = (rating: number) => {
//     if (!readOnly) {
//       onRatingChange(rating);
//     }
//   };
//   for (let i = 1; i <= 5; i++) {
//     stars.push(
//       <span
//         key={i}
//         className={`text-xl cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
//         onClick={() => handleClick(i)}
//       >
//         &#9733;
//       </span>
//     );
//   }
//   return <>{stars}</>;
// };

interface StarRatingProps {
  rating: number;
  readOnly: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({ rating, readOnly, onRatingChange = () => {} }: StarRatingProps) => {
  const handleClick = (rating: number) => {
    if (!readOnly) {
      onRatingChange(rating);
    }
  };

  const stars = [];
  const percentageRating = (rating % 1) * 100;

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <div
        key={i}
        className='relative inline-block w-6 h-6 text-xl text-gray-300 cursor-pointer'
        onClick={() => handleClick(i)}
      >
        <span className='absolute inset-0'>&#9733;</span>
        {i <= Math.floor(rating) && <span className='absolute inset-0 text-yellow-500'>&#9733;</span>}
        {i === Math.ceil(rating) && (
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
  }

  return <>{stars}</>;
};
