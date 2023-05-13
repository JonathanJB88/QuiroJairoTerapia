import { toastNotification } from '@/helpers';
import { useAuthStore, useCommentStore } from '@/hooks';
import { UserRole } from '@/models/User';

interface AdminButtonsProps {
  commentId: string;
  approved: boolean;
}

export const AdminButtons = ({ commentId, approved }: AdminButtonsProps) => {
  const { user } = useAuthStore();
  const { updateComment, deleteComment } = useCommentStore();

  const handleApprove = async () => {
    const { ok, msg } = await updateComment({ commentId, approved: true });
    toastNotification(ok ? 'success' : 'error', msg);
  };

  const handleDelete = async () => {
    const { ok, msg } = await deleteComment(commentId);
    toastNotification(ok ? 'success' : 'error', msg);
  };

  if (user?.role !== UserRole.ADMIN) return null;

  return (
    <div className='flex justify-end mt-2 space-x-2'>
      {!approved && (
        <button
          className='px-3 py-1 text-sm text-white transition-all duration-200 ease-in-out bg-green-500 rounded-md hover:bg-opacity-80'
          onClick={handleApprove}
        >
          Aprobar
        </button>
      )}
      <button
        className='px-3 py-1 text-sm text-white transition-all duration-200 ease-in-out bg-red-500 rounded-md hover:bg-opacity-80'
        onClick={handleDelete}
      >
        Eliminar
      </button>
    </div>
  );
};
