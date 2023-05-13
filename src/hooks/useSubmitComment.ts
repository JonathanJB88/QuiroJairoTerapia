import { CommentType } from '@/interfaces';
import { useAuthStore, useCommentStore, useForm, useUIStore } from '@/hooks';
import { useState } from 'react';
import { toastNotification } from '@/helpers';

interface CommentFormFields {
  content: string;
  rating: number;
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

export const useSubmitComment = () => {
  const { user } = useAuthStore();
  const { postComment } = useCommentStore();
  const { toggleAuthModal } = useUIStore();
  const { content, rating, onInputChange, setFormState, onResetForm } =
    useForm<CommentFormFields>(initialCommentFormFields);

  const [isPosting, setIsPosting] = useState(false);
  const handleRatingChange = (newRating: number) => {
    setFormState((prevFormState) => ({ ...prevFormState, rating: newRating }));
  };
  const handleSubmit = async () => {
    if (!user) return toggleAuthModal();
    if (!content) return toastNotification('error', 'Por favor, completa todos los campos.');
    const comment: CommentToPost = {
      userId: user.uid,
      content,
      rating,
      type: 'review',
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
