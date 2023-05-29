import { CategoryType } from '@/interfaces';

interface BreadcumbProps {
  categories: CategoryType[];
  onNavigate: () => void;
}

export const Breadcrumb = ({ categories, onNavigate }: BreadcumbProps) => {
  return (
    <div className='px-2 mb-4 font-sans rounded-md text-start w-fit text-turquoise bg-navy-blue'>
      <button onClick={onNavigate} className='text-sm text-turquoise'>
        Blog
      </button>

      <span className='mx-2 text-sm text-turquoise'>&gt;</span>
      {categories.map((category) => (
        <span key={category._id} className='text-sm text-turquoise'>
          {category.title}
          {'  '}
        </span>
      ))}
    </div>
  );
};
