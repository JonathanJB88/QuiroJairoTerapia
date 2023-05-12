import { CommentType } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  commentId: string;
  postId: string;
  userId: {
    _id: string;
    name: string;
  };
  content: string;
  rating: number;
  type: CommentType;
  approved: boolean;
  createdAt: Date;
}

interface CommentState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  comments: Comment[];
  errorMessage: string | undefined;
}

const initialState: CommentState = {
  status: 'idle',
  comments: [],
  errorMessage: undefined,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    onLoading: (state) => {
      state.status = 'loading';
    },
    onGetComments: (state, { payload }: PayloadAction<Comment[]>) => {
      state.status = 'succeeded';
      state.comments = payload;
    },
    onPostComment: (state, { payload }: PayloadAction<Comment>) => {
      state.status = 'succeeded';
      state.comments.push(payload);
    },
    onUpdateComment: (state, { payload }: PayloadAction<Comment>) => {
      state.status = 'succeeded';
      state.comments = state.comments.map((comment) => (comment.commentId === payload.commentId ? payload : comment));
    },
    onDeleteComment: (state, { payload }: PayloadAction<string>) => {
      state.status = 'succeeded';
      state.comments = state.comments.filter((comment) => comment.commentId !== payload);
    },
    onFailed: (state, { payload }: PayloadAction<string>) => {
      state.status = 'failed';
      state.errorMessage = payload;
    },
    onCleanErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onLoading,
  onGetComments,
  onPostComment,
  onUpdateComment,
  onDeleteComment,
  onFailed,
  onCleanErrorMessage,
} = commentSlice.actions;
