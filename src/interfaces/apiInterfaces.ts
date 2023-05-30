import { Schema } from 'mongoose';
import { NextApiRequest } from 'next';

export interface CreateCommentBody {
  postId: string;
  userId: string;
  content: string;
  rating: number;
  type: CommentType;
}

export interface GetCommentsQuery {
  postId?: string;
  type?: CommentType;
}

export interface UpdateCommentBody {
  commentId: string;
  content: string;
  rating: number;
  approved: boolean;
}

export interface DeleteCommentQuery {
  commentId?: string;
}

export type CommentType = 'review' | 'comment';

export interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface RevalidateTokenRequest {
  uid: string;
  name: string;
}

export interface CustomNextApiRequest extends NextApiRequest {
  uid: string;
  name: string;
}

export interface LikeCommentBody {
  commentId: string;
  userId: Schema.Types.ObjectId;
}

export interface CreateCommentData {
  postId?: string;
  userId: string;
  content: string;
  rating?: number;
  type: CommentType;
}
