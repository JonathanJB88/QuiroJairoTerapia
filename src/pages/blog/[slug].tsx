import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { ParsedUrlQuery } from 'querystring';
import { getAllPosts, getPostBySlug } from '@/lib';
import {
  PostAuthorInfo,
  PostImage,
  PostMeta,
  ShareButtons,
  Breadcrumb,
  CommentBox,
  PostBody,
  CommentList,
} from '@/components';
import { formatDate } from '@/helpers';
import { useAuthStore } from '@/hooks';
import { Post } from '@/interfaces';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface BlogPostPageProps {
  post: Post;
}

const LogoBlock = () => {
  return (
    <>
      <Image
        src='/images/quirojairoterapialogo.jpeg'
        alt='QuiroJairoTerapia'
        width={95}
        height={95}
        className='rounded-full'
        style={{ filter: 'drop-shadow(0 0 1px black)' }}
      />

      <div className='flex flex-col'>
        <span className='mb-1 text-xl select-none text-navy-blue font-roboto'>QuiroJairoTerapia</span>
        <span className='text-sm select-none text-navy-blue font-roboto'>Alivio y bienestar en tus manos</span>
      </div>
    </>
  );
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const router = useRouter();

  const { checkAuthToken } = useAuthStore();

  const formattedDate = formatDate(new Date(post.publishedAt), 'published');

  const handleGoToBlog = () => router.push({ pathname: '/', query: { section: 'consejos' } });

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return (
    <>
      <div className='items-center justify-center hidden my-2 space-x-2 md:flex md:absolute top-2 left-2'>
        <LogoBlock />
      </div>
      <div className='p-4 bg-opacity-30 md:p-8 md:px-12 md:flex bg-light-gray'>
        <Toaster />
        <div className='flex items-center justify-center my-2 space-x-2 md:hidden top-2 left-2'>
          <LogoBlock />
        </div>
        <div className='md:mt-20 md:w-2/3'>
          <Breadcrumb categories={post.categories} onNavigate={handleGoToBlog} />

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
        </div>

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
              <ShareButtons title={post.title} currentPath={router.asPath} />

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
    </>
  );
};

export default BlogPostPage;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps, Params> = async ({ params }) => {
  if (!params) throw new Error('Params is undefined');
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};