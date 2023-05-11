import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiClient from '@/helpers/apiConfig';
import {
  RootState,
  Comment,
  onLoading,
  onGetComments,
  onPostComment,
  onUpdateComment,
  onDeleteComment,
  onFailed,
  onCleanErrorMessage,
} from '@/store';
import { CommentType } from '@/interfaces';

export interface CommentPost {
  userId: string;
  content: string;
  rating: number;
  type: CommentType;
  postId?: string;
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
      const { data } = await apiClient.get(endpoint);
      dispatch(onGetComments(data));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg
          ? error.response.data.msg
          : 'Error al obtener los comentarios';
      handleErrorMessage(errorMessage);
    }
  };

  const postComment = async (comment: CommentPost) => {
    dispatch(onLoading());
    try {
      const { data } = await apiClient.post('/api/comments/create', comment);
      dispatch(onPostComment(data));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg
          ? error.response.data.msg
          : 'Error al crear el comentario';
      handleErrorMessage(errorMessage);
    }
  };

  const updateComment = async (comment: Comment) => {
    dispatch(onLoading());
    try {
      const { data } = await apiClient.put('/api/comments/update', comment);
      dispatch(onUpdateComment(data));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg
          ? error.response.data.msg
          : 'Error al actualizar el comentario';
      handleErrorMessage(errorMessage);
    }
  };

  const deleteComment = async (commentId: string) => {
    dispatch(onLoading());
    try {
      await apiClient.delete(`/api/comments/delete?commentId=${commentId}`);
      dispatch(onDeleteComment(commentId));
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.msg
          ? error.response.data.msg
          : 'Error al eliminar el comentario';
      handleErrorMessage(errorMessage);
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
