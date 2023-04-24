import { Document, Model, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isBanned: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, 'El nombre es requerido'] },
    email: { type: String, required: [true, 'El correo es requerido'], unique: true },
    password: { type: String, required: [true, 'La contraseña es'] },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default (models.User as Model<IUser>) || model<IUser>('User', UserSchema);
