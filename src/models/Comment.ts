import { Document, Model, Schema, model, models } from 'mongoose';
import User from './User';
import { CommentType } from '@/interfaces';

export interface IComment extends Document {
  postId: string;
  userId: Schema.Types.ObjectId;
  content: string;
  rating: number;
  type: CommentType;
  approved: boolean;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    type: { type: String, required: true, enum: ['review', 'comment'] },
    approved: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CommentSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export default (models.Comment as Model<IComment>) || model<IComment>('Comment', CommentSchema);
