import { AiOutlineLike } from 'react-icons/ai';

interface LikeButtonProps {
  onClick: () => void;
  likes: number;
}

export const LikeButton = ({ onClick, likes }: LikeButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex items-center mt-2 space-x-1 font-medium transition-all duration-200 ease-in-out text-turquoise hover:text-navy-blue'
    >
      <AiOutlineLike />
      <span key={likes} className='animate-expand-in'>
        {likes}
      </span>
      <span>Me gusta</span>
    </button>
  );
};
