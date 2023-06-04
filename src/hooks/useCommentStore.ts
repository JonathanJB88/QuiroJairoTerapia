import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiClient from '@/helpers/apiConfig';
import {
  RootState,
  Comment,
  AppDispatch,
  onLoading,
  onGetComments,
  onPostComment,
  onUpdateComment,
  onDeleteComment,
  onFailed,
  onCleanErrorMessage,
} from '@/store';
import { CommentType } from '@/interfaces';
import { handleErrorMessage } from '@/helpers';
import { useCallback } from 'react';

interface CommentResponse {
  ok: boolean;
  msg: string;
  comment: Comment;
}

interface CommentDataUpdate {
  commentId: string;
  approved: boolean;
}

interface CommentDataPost {
  content: string;
  rating: number | null;
  userId: string;
  type: CommentType;
  postId?: string;
}

export const useCommentStore = () => {
  const { status, comments, errorMessage } = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch<AppDispatch>();

  const postComment = useCallback(
    async (comment: CommentDataPost): Promise<{ ok: boolean; msg: string }> => {
      dispatch(onLoading());
      try {
        const {
          data: { comment: postedComment, ok, msg },
        } = await apiClient.post<CommentResponse>('/api/comments/create', comment);
        dispatch(onPostComment(postedComment));
        return { ok, msg };
      } catch (error) {
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data.msg
            ? error.response.data.msg
            : 'Error al crear el comentario';
        handleErrorMessage(errorMessage, dispatch, onFailed, onCleanErrorMessage);
        return { ok: false, msg: errorMessage };
      }
    },
    [dispatch]
  );

  const updateComment = useCallback(
    async (comment: CommentDataUpdate): Promise<{ ok: boolean; msg: string }> => {
      dispatch(onLoading());
      try {
        const {
          data: { comment: updatedComment, ok, msg },
        } = await apiClient.put<CommentResponse>('/api/comments/update', comment);

        dispatch(onUpdateComment(updatedComment));
        return { ok, msg };
      } catch (error) {
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data.msg
            ? error.response.data.msg
            : 'Error al actualizar el comentario';
        handleErrorMessage(errorMessage, dispatch, onFailed, onCleanErrorMessage);
        return { ok: false, msg: errorMessage };
      }
    },
    [dispatch]
  );

  const deleteComment = useCallback(
    async (commentId: string): Promise<{ ok: boolean; msg: string }> => {
      dispatch(onLoading());
      try {
        const {
          data: {
            comment: { commentId: deletedCommentId },
            ok,
            msg,
          },
        } = await apiClient.delete<CommentResponse>(`/api/comments/delete?commentId=${commentId}`);
        dispatch(onDeleteComment(deletedCommentId));
        return { ok, msg };
      } catch (error) {
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data.msg
            ? error.response.data.msg
            : 'Error al eliminar el comentario';
        handleErrorMessage(errorMessage, dispatch, onFailed, onCleanErrorMessage);
        return { ok: false, msg: errorMessage };
      }
    },
    [dispatch]
  );

  const getComments = useCallback(
    async (type: CommentType, postId?: string): Promise<void> => {
      dispatch(onLoading());
      try {
        const endpoint =
          type === 'review'
            ? `/api/comments/get-by-post?type=${type}`
            : `/api/comments/get-by-post?type=${type}&postId=${postId}`;
        const { data } = await apiClient.get<Comment[]>(endpoint);
        dispatch(onGetComments(data));
      } catch (error) {
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data.msg
            ? error.response.data.msg
            : 'Error al obtener los comentarios';
        handleErrorMessage(errorMessage, dispatch, onFailed, onCleanErrorMessage);
      }
    },
    [dispatch]
  );

  const likeComment = useCallback(
    async (commentId: string, userId: string): Promise<{ ok: boolean; msg: string }> => {
      dispatch(onLoading());
      try {
        const {
          data: { ok, msg, comment },
        } = await apiClient.put<CommentResponse>(`/api/comments/like`, {
          commentId,
          userId,
        });
        dispatch(onUpdateComment(comment));
        return { ok, msg };
      } catch (error) {
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data.msg
            ? error.response.data.msg
            : 'Error al dar like al comentario';
        handleErrorMessage(errorMessage, dispatch, onFailed, onCleanErrorMessage);
        return { ok: false, msg: errorMessage };
      }
    },
    [dispatch]
  );

  const cleanCommentsState = useCallback(() => {
    dispatch(onGetComments([]));
    dispatch(onCleanErrorMessage());
  }, [dispatch]);

  return {
    //Props
    status,
    comments,
    errorMessage,
    //Functions
    getComments,
    postComment,
    updateComment,
    deleteComment,
    likeComment,
    cleanCommentsState,
  };
};
