import { PostAuthorInfo, PostCategories } from '@/components';
import { formatDate } from '@/helpers';
import { Post } from '@/interfaces';

interface PostInfoProps {
  post: Post;
}

export const PostInfo = ({ post }: PostInfoProps) => {
  const formattedDate = formatDate(new Date(post.publishedAt));
  return (
    <div className='grid grid-rows-2 space-y-2 grid-auto-rows: 1fr auto;'>
      <div>
        <PostCategories categories={post.categories} />
        <h3 className='overflow-hidden font-sans text-base italic font-semibold md:text-xl text-light-gray line-clamp-2 overflow-ellipsis'>
          {post.title}
        </h3>
      </div>
      <PostAuthorInfo author={post.author} postDate={formattedDate} />
    </div>
  );
};
