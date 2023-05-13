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
  rating: number;
  userId: string;
  type: CommentType;
  postId?: string;
}

export const useCommentStore = () => {
  const { status, comments, errorMessage } = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch<AppDispatch>();

  const getComments = async (type: CommentType, postId?: string): Promise<void> => {
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
  };

  const postComment = async (comment: CommentDataPost): Promise<{ ok: boolean; msg: string }> => {
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
  };

  const updateComment = async (comment: CommentDataUpdate): Promise<{ ok: boolean; msg: string }> => {
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
      handleErrorMessage(errorMessage, dispatch, onFailed, onCleanErrorMessage);
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
