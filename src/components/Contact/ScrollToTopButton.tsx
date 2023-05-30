import { BsFillArrowUpSquareFill } from 'react-icons/bs';

interface ScrollToTopButtonProps {
  onClick: () => void;
}

export const ScrollToTopButton = ({ onClick }: ScrollToTopButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='absolute transition-all duration-200 ease-in-out text-turquoise hover:text-light-gray text-shadow sm:top-2 sm:right-4 bottom-8 right-8 sm:bottom-auto sm:left-auto'
      style={{ filter: 'drop-shadow(0 0 1px black)' }}
    >
      <BsFillArrowUpSquareFill className='w-6 h-6' />
    </button>
  );
};
