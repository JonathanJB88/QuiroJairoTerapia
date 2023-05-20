import Image from 'next/image';
import { Post } from '@/interfaces';
import { SectionIntro } from '@/components';

interface CarouselPostCardProps {
  post: Post;
}

export const CarouselPostCard = ({ post: { title, mainImage } }: CarouselPostCardProps) => {
  const {
    alt,
    asset: { url },
  } = mainImage;

  return (
    <div className='relative aspect-[16/9] w-full overflow-hidden md:aspect-[6/1]'>
      <Image
        src={url}
        alt={alt || `Imagen de portada del post ${title}`}
        loading='lazy'
        fill
        sizes='(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1280px'
        className='rounded-lg '
      />
      <div className='absolute inset-0 z-10 bg-black rounded-lg bg-opacity-60' />
      <div className='absolute bottom-0 left-0 z-20 flex flex-col items-start justify-end px-6 mb-8 md:w-2/3'>
        <h2 className='text-sm font-semibold text-white md:text-lg font-roboto text-start'>{title}</h2>
        <button className='px-2 py-1 font-sans text-xs font-semibold transition-all duration-200 ease-in-out rounded-md md:text-sm text-navy-blue bg-turquoise hover:bg-opacity-80'>
          Leer más
        </button>
      </div>
    </div>
  );
};
