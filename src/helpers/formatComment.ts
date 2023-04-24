import { Schema } from 'mongoose';
import { IComment } from '@/models/Comment';
import { CommentType } from '@/interfaces';

export interface ICommentFormatted {
  commentId: Schema.Types.ObjectId;
  postId: string;
  userId: Schema.Types.ObjectId;
  content: string;
  rating: number;
  type: CommentType;
  approved: boolean;
  createdAt: Date;
}

export const formatComment = (comment: IComment): ICommentFormatted => ({
  commentId: comment._id,
  postId: comment.postId,
  userId: comment.userId,
  content: comment.content,
  rating: comment.rating,
  type: comment.type,
  approved: comment.approved,
  createdAt: comment.createdAt,
});
