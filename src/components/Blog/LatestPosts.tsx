import { PostImage, PostInfo, SectionIntro } from '@/components';
import { Post } from '@/interfaces';
import Link from 'next/link';

interface LatestPostsProps {
  posts: Post[];
  handleAllPosts: () => void;
}

export const LatestPosts = ({ posts, handleAllPosts }: LatestPostsProps) => {
  const leftPost = posts[0];
  const rightPosts = posts.slice(1, 4);
  return (
    <div className='relative mb-4'>
      <button
        onClick={handleAllPosts}
        className='absolute text-sm italic font-light underline text-light-gray text-shadow font-roboto -bottom-4 right-4 md:top-9 md:bottom-auto md:right-6'
      >
        Descubre más &#8594;
      </button>

      <div className='mb-4 text-center'>
        <SectionIntro
          title='Toma el Control de Tu Bienestar'
          description='Últimas Reflexiones y Consejos de Tu Terapeuta'
        />
      </div>
      <div className='container flex items-center justify-center px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-5'>
          {/* Left column */}
          <div className='space-y-6 rounded-lg md:p-3 md:border-2 border-light-gray md:col-span-3'>
            <Link href={`/blog/${leftPost.slug}`}>
              <div className='relative w-full h-40 rounded-lg md:h-96'>
                <PostImage post={leftPost} />
              </div>
            </Link>
            <PostInfo post={leftPost} />
          </div>

          {/* Right column */}
          <div className='flex flex-col justify-center space-y-8 md:col-span-2'>
            {rightPosts.map((post) => (
              <div key={post._id} className='flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
                <Link href={`/blog/${post.slug}`}>
                  <div className='relative flex-shrink-0 w-full h-40 rounded-lg md:w-80'>
                    <PostImage post={post} />
                  </div>
                </Link>
                <PostInfo post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
