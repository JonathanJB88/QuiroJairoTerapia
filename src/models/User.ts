import { Document, Model, Schema, model, models } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, 'El nombre es requerido'] },
    email: { type: String, required: [true, 'El correo es requerido'], unique: true },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    role: { type: String, enum: [UserRole.ADMIN, UserRole.USER], default: UserRole.USER },
  },
  { timestamps: true }
);

export default (models?.User as Model<IUser>) || model<IUser>('User', UserSchema);
