import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isBanned: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: [true, 'El nombre es requerido'] },
  email: { type: String, required: [true, 'El correo es requerido'], unique: true },
  password: { type: String, required: [true, 'La contraseña es obligatoria'] },
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
});

export default mongoose.model<IUser>('User', UserSchema);
