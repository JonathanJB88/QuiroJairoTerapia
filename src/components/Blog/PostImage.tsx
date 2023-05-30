import Image from 'next/image';
import { Post } from '@/interfaces';
import Link from 'next/link';

const imageSizes = '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px';

export const PostImage = ({ post }: { post: Post }) => (
  <Image
    src={post.mainImage?.asset.url}
    alt={post.mainImage?.alt || `Imagen de portada del post ${post.title}`}
    fill
    loading='lazy'
    sizes={imageSizes}
    className='rounded-lg shadow-lg'
  />
);
