import { useState } from 'react';
import { FormValidators, useAuthStore, useCommentStore, useForm, useUIStore } from '@/hooks';
import { toastNotification } from '@/helpers';
import { CommentType } from '@/interfaces';

interface CommentFormFields {
  content: string;
  rating: number | null;
}

interface CommentToPost extends CommentFormFields {
  userId: string;
  type: CommentType;
  postId?: string;
  approved?: boolean;
}

const initialCommentFormFields: CommentFormFields = {
  content: '',
  rating: 5,
};

export const useSubmitComment = (type: CommentType, postId?: string) => {
  const { user } = useAuthStore();
  const { postComment } = useCommentStore();
  const { toggleAuthModal } = useUIStore();
  const {
    formState: { content, rating },
    onInputChange,
    setFormState,
    onResetForm,
  } = useForm<CommentFormFields>(initialCommentFormFields);

  const [isPosting, setIsPosting] = useState(false);
  const handleRatingChange = (newRating: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, rating: newRating }));
  };
  const handleSubmit = async () => {
    if (!user) return toggleAuthModal();
    if (!content) return toastNotification('error', 'Por favor, escribe un comentario para publicar.');
    if (content.length < 10)
      return toastNotification(
        'error',
        `${type === 'review' ? 'Tu reseña' : 'Tu comentario'} debe tener al menos 10 caracteres.`
      );
    const comment: CommentToPost = {
      userId: user.uid,
      content,
      rating: type === 'review' ? rating : null,
      type,
      postId,
    };
    setIsPosting(true);
    const { ok, msg } = await postComment(comment);
    setIsPosting(false);
    if (ok) toastNotification('success', msg);
    onResetForm();
  };

  return {
    content,
    rating,
    isPosting,
    onInputChange,
    handleRatingChange,
    handleSubmit,
    onResetForm,
  };
};
