import { CategoryType } from '@/interfaces';

interface PostCategoriesProps {
  categories: CategoryType[];
}

export const PostCategories = ({ categories }: PostCategoriesProps) => {
  return (
    <div className='flex items-center justify-start mb-2'>
      <p className='px-2 py-1 font-bold uppercase rounded-md shadow-md text-2xs md:text-xs text-navy-blue bg-turquoise font-roboto'>
        Categoría
      </p>
      {categories.map((category) => (
        <span key={category._id} className='mx-2 text-xs md:text-sm text-light-gray text-shadow'>
          {category.title}
        </span>
      ))}
    </div>
  );
};
