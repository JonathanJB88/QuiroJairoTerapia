import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiClient from '@/helpers/apiConfig';
import {
  RootState,
  onLoading,
  onGetComments,
  onPostComment,
  onUpdateComment,
  onDeleteComment,
  onFailed,
  onCleanErrorMessage,
  Comment,
} from '@/store';
import { CommentType } from '@/interfaces';
import { CommentToPost, CommentToUpdate } from '@/components';

interface CommentResponse {
  ok: boolean;
  msg: string;
  comment: Comment;
}

export const useCommentStore = () => {
  const { status, comments, errorMessage } = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch();

  const handleErrorMessage = (message: string) => {
    dispatch(onFailed(message));
    setTimeout(() => {
      dispatch(onCleanErrorMessage());
    }, 3000);
  };

  const getComments = async (type: CommentType, postId?: string) => {
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
      handleErrorMessage(errorMessage);
    }
  };

  const postComment = async (comment: CommentToPost): Promise<{ ok: boolean; msg: string }> => {
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
      handleErrorMessage(errorMessage);
      return { ok: false, msg: errorMessage };
    }
  };

  const updateComment = async (comment: CommentToUpdate): Promise<{ ok: boolean; msg: string }> => {
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
      handleErrorMessage(errorMessage);
      return { ok: false, msg: errorMessage };
    }
  };

  const deleteComment = async (commentId: string): Promise<{ ok: boolean; msg: string }> => {
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
      handleErrorMessage(errorMessage);
      return { ok: false, msg: errorMessage };
    }
  };

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
  };
};
