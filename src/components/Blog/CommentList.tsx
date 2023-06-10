import { useEffect } from 'react';
import { useAuthStore, useCommentsData, useCommentStore } from '@/hooks';
import { formatDate, toastNotification } from '@/helpers';
import { AdminButtons, LikeButton } from '@/components';

interface CommentListProps {
  postId: string;
}

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { user } = useAuthStore();
  const { comments, errorMessage, getComments, likeComment } = useCommentStore();
  const { recentComments } = useCommentsData(user, comments);

  const handleLikeClick = async (commentId: string) => {
    if(!user) return toastNotification('error', 'Debes iniciar sesión para poder dar like a un comentario')
    const { ok, msg } = await likeComment(commentId, user?.uid!);
    if (ok) return toastNotification('success', msg);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      toastNotification('error', errorMessage);
    }
  }, [errorMessage, postId]);

  useEffect(() => {
    getComments('comment', postId);
  }, [postId, getComments]);

  if (recentComments.length === 0) {
    return (
      <div>
        <h3>Todavía no hay comentarios!</h3>
        <p>Sé el primero en comentar este post!</p>
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
          <LikeButton likes={comment.likes?.length} onClick={() => handleLikeClick(comment.commentId)} />
          <AdminButtons commentId={comment.commentId} approved={comment.approved} />
        </div>
      ))}
    </div>
  );
};
