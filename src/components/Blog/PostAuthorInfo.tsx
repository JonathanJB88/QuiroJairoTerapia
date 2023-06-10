import Image from 'next/image';
import { AuthorType } from '@/interfaces';

interface PostAuthorInfoProps {
  author: AuthorType;
  postDate?: string;
}

export const PostAuthorInfo = ({ author, postDate }: PostAuthorInfoProps) => {
  return (
    <div className='flex items-start space-x-2'>
      <div className='relative w-10 h-10 md:w-14 md:h-14'>
        <Image
          src={author.avatar}
          alt={author.name}
          loading='lazy'
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px'
          className='p-0.5 border-2 rounded-full border-light-gray shadow-md'
        />
      </div>
      <div className='font-sans'>
        <p className='text-xs font-medium md:text-base text-shadow text-light-gray'>
          {author.name}
        </p>
        <p className='text-2xs md:text-xs text-light-gray'>{author.bio}</p>
        {postDate && (
          <p className='text-2xs md:text-2xs opacity-80 text-light-gray'>
            {postDate}
          </p>
        )}
      </div>
    </div>
  );
};
