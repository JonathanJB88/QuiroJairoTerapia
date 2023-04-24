import { CommentType } from '@/interfaces';
import { Document, Model, Schema, model, models } from 'mongoose';

export interface IComment extends Document {
  postId: string;
  userId: Schema.Types.ObjectId;
  content: string;
  rating: number;
  type: CommentType;
  approved: boolean;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    type: { type: String, required: true, enum: ['review', 'comment'] },
    approved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default (models.Comment as Model<IComment>) || model<IComment>('Comment', CommentSchema);
