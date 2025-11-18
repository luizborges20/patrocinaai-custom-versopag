import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'user' | 'producer' | 'admin';
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, forneça um nome'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Por favor, forneça um email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false, // Não retorna a senha por padrão nas queries
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'producer', 'admin'],
      default: 'user',
    },
    emailVerified: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Previne recompilação do modelo durante hot-reload no desenvolvimento
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
