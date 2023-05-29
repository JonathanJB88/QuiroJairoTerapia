import { useEffect } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { useAuthStore, useCommentsData, useCommentStore } from '@/hooks';
import { formatDate, toastNotification } from '@/helpers';
import { AdminButtons } from '../Experiences/AdminButtons';

interface CommentListProps {
  postId: string;
}

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { user } = useAuthStore();
  const { comments, errorMessage, status, getComments } = useCommentStore();
  const { recentComments } = useCommentsData(user, comments);

  useEffect(() => {
    if (errorMessage !== undefined && errorMessage !== 'No se encontraron comentarios') {
      toastNotification('error', errorMessage);
    }
  }, [errorMessage, postId]);

  useEffect(() => {
    getComments('comment', postId);
  }, [postId, getComments]);

  if (status === 'loading') return <p className='text-center'>Cargando...</p>;

  if (recentComments.length === 0) {
    return (
      <div>
        <h3>No comments yet!</h3>
        <p>Be the first to comment on this post!</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {recentComments.map((comment) => (
        <div key={comment.commentId} className='p-2 font-sans rounded-md bg-light-gray'>
          <div className='flex items-center w-full px-2 py-1 rounded-md bg-navy-blue'>
            <h4 className='text-base font-medium text-turquoise'>{comment.user.name}</h4>
            <small className='mx-2 mt-1 text-light-gray text-2xs'>{formatDate(new Date(comment.createdAt))}</small>
          </div>
          <p className='px-2 mt-2 text-gray-900'>{comment.content}</p>
          <button
            type='button'
            className='flex items-center mt-2 space-x-1 font-medium transition-all duration-200 ease-in-out text-turquoise hover:text-navy-blue'
          >
            <AiOutlineLike />
            <span>Me gusta</span>
          </button>
          <AdminButtons commentId={comment.commentId} approved={comment.approved} />
        </div>
      ))}
    </div>
  );
};
