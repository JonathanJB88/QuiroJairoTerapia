import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  content: string;
  rating: number;
  type: 'review' | 'comment';
  approved: boolean;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  type: { type: String, required: true, enum: ['review', 'comment'] },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
