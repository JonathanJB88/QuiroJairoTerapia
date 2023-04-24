import { CommentType } from '@/interfaces';

interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  rating: number;
  type: CommentType;
  approved: boolean;
  createdAt: Date;
}

export const formatComment = (comment: Comment) => ({
  commentId: comment._id,
  postId: comment.postId,
  userId: comment.userId,
  content: comment.content,
  rating: comment.rating,
  type: comment.type,
  approved: comment.approved,
  createdAt: comment.createdAt,
});
