import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { ParsedUrlQuery } from 'querystring';
import { getAllPosts, getPostBySlug } from '@/lib';
import { BiLeftArrowAlt } from 'react-icons/bi';
import {
  PostAuthorInfo,
  PostImage,
  PostMeta,
  ShareButtons,
  Breadcrumb,
  CommentBox,
  PostBody,
  CommentList,
  Logo,
} from '@/components';
import { formatDate } from '@/helpers';
import { useAuthStore } from '@/hooks';
import { MenuItems, Post } from '@/interfaces';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface BlogPostPageProps {
  post: Post;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const { checkAuthToken } = useAuthStore();
  const router = useRouter();

  const formattedDate = formatDate(new Date(post.publishedAt), 'published');

  const handleGoToBlog = () => {
    localStorage.setItem('activeSection', MenuItems.CONSEJOS);
    router.push('/');
  };

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return (
    <div className='p-4 bg-opacity-30 md:p-8 md:px-12 bg-light-gray'>
      <button
        onClick={handleGoToBlog}
        className='items-center justify-center hidden my-2 space-x-2 cursor-pointer md:flex md:absolute top-2 left-2'
      >
        <Logo />
      </button>
      <div className='md:flex'>
        <Toaster />
        <button
          onClick={handleGoToBlog}
          className='flex items-center justify-center my-2 space-x-2 cursor-pointer md:hidden top-2 left-2'
        >
          <Logo />
        </button>
        <article className='md:mt-20 md:w-2/3'>
          <Breadcrumb
            categories={post.categories}
            onNavigate={handleGoToBlog}
          />

          <h1 className='mb-2 text-2xl italic font-extrabold md:mr-8 md:text-4xl font-roboto text-light-gray text-shadow'>
            {post.title}
          </h1>
          <PostMeta date={formattedDate} />

          {/* Mobile-only Image */}
          <div className='relative mt-4 rounded-lg shadow-md h-72 md:hidden'>
            <PostImage post={post} />
          </div>

          <div className='mt-8'>
            <PostBody body={post.body} />
          </div>
        </article>

        <div className='mt-8 md:w-1/3 md:mt-0'>
          {/* Desktop-only Image */}
          <div className='relative hidden mb-4 rounded-lg shadow-md h-72 md:block'>
            <PostImage post={post} />
          </div>

          <div className='flex justify-center'>
            <div className='flex flex-col my-2 space-y-4 md:my-8'>
              <h3 className='font-sans text-xl italic font-medium md:text-2xl text-shadow text-light-gray'>
                Comparte este artículo
              </h3>
              <ShareButtons title={post.title} currentPath={''} />

              <h3 className='pt-4 mt-4 font-sans text-xl italic font-medium md:text-2xl text-shadow text-light-gray'>
                Autor
              </h3>
              <PostAuthorInfo author={post.author} />
            </div>
          </div>
          <CommentBox type='comment' postId={post._id} />
          <div className='mt-8'>
            <h3 className='font-sans text-xl italic font-medium md:text-2xl text-shadow text-light-gray'>
              Comentarios
            </h3>
            <div className='mt-4'>
              <CommentList postId={post._id} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-start mt-6 mb-4'>
        <button
          onClick={handleGoToBlog}
          className='flex items-center space-x-2 cursor-pointer'
        >
          <BiLeftArrowAlt
            size={32}
            className='text-light-gray'
            style={{ filter: 'drop-shadow(0 0 1px black)', objectFit: 'cover' }}
          />
        </button>
      </div>
    </div>
  );
};

export default BlogPostPage;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<
  BlogPostPageProps,
  Params
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
