import InfiniteScroll from 'react-infinite-scroll-component';
import { InputField, PostImage, PostInfo, PostsLoading, SectionIntro } from '@/components';
import { useBlogPosts } from '@/hooks';
import { Post } from '@/interfaces';

interface AllBlogPostsProps {
  posts: Post[];
  handleLatestPosts: () => void;
}

export const AllBlogPosts: React.FC<AllBlogPostsProps> = ({ posts, handleLatestPosts }) => {
  const { items, query, hasMore, onInputChange, fetchMoreData } = useBlogPosts(posts);

  return (
    <div className='relative p-4 mx-auto'>
      <button
        onClick={handleLatestPosts}
        aria-label='Ir a las últimas reflexiones y consejos'
        className='absolute text-sm italic font-light underline text-light-gray text-shadow font-roboto -bottom-4 right-4 md:top-0 md:bottom-auto md:right-6'
      >
        &#8592; Últimas Reflexiones y Consejos
      </button>
      <SectionIntro
        title='Explora el Mundo del Quiromasaje y la Terapia Manual'
        description='Desde reflexiones sobre quiromasajes hasta consejos de terapia, tenemos una amplia gama de temas para ayudarte a mejorar tu bienestar. Explora nuestros artículos y amplía tu horizonte de conocimiento.'
      />
      <InputField
        placeholder='Buscar temas, categorías, consejos, técnicas...'
        onChange={onInputChange}
        size='small'
        name='query'
        value={query}
        type='text'
        error={undefined}
      />

      <InfiniteScroll dataLength={items.length} next={fetchMoreData} hasMore={hasMore} loader={<PostsLoading />}>
        <div className='grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-3'>
          {items.map((post) => (
            <div key={post._id} className='mb-4 md:mb-2'>
              <div className='relative w-full h-40 mb-2 rounded-lg md:h-60 md:mr-4'>
                <PostImage post={post} />
              </div>
              <PostInfo post={post} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
