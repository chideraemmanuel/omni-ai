import mongoose from 'mongoose';

export const connectToDatabase = () =>
  mongoose.connect(process.env.MONGODB_URI!);
