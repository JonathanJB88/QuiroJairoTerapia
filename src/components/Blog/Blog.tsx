import { Post } from '@/interfaces';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { CarouselPostCard, InputField, SectionIntro } from '@/components';

interface BlogProps {
  posts: Post[];
}

export const Blog = ({ posts }: BlogProps) => {
  // Search term state
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered and sorted posts
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);

  // Sort and filter posts whenever posts or search term changes
  useEffect(() => {
    let newPosts = posts;

    // Filter by search term (in real application, implement more sophisticated search)
    if (searchTerm) {
      newPosts = newPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sort by date
    // newPosts = newPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    setDisplayPosts(newPosts);
  }, [posts, searchTerm]);

  // Render
  return (
    <div className='flex flex-col justify-center w-full p-4 min-vh-screen'>
      <SectionIntro
        title='Toma el Control de Tu Bienestar:'
        description='Últimas Reflexiones y Consejos de Tu Terapeuta'
      />

      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators
        autoPlay
        interval={5000}
        infiniteLoop
        useKeyboardArrows
        swipeable
        emulateTouch
        showArrows={false}
        stopOnHover
        dynamicHeight
      >
        {posts.slice(-5).map((post) => (
          <CarouselPostCard key={post.slug} post={post} />
        ))}
      </Carousel>

      <div className='w-full mt-4'>
        <InputField
          name='searchTerm'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Buscar...'
          type='text'
          error={undefined}
        />

        <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3'>
          {displayPosts.map((post) => (
            <div key={post.slug} className='overflow-hidden bg-white rounded-lg shadow-md'>
              <img className='object-cover w-full h-56' src={post.mainImage.asset.url} alt={post.mainImage.alt} />
              <div className='p-4'>
                <h3 className='mb-2 text-lg font-semibold font-roboto text-navy-blue'>{post.title}</h3>
                <div className='flex items-center mb-4 text-sm text-navy-blue-lighter'>
                  <p>{post.authorName}</p>
                  <p className='ml-4'>{post.publishedAt}</p>
                </div>
                <button className='font-semibold text-turquoise hover:text-turquoise-lighter'>Leer más</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
