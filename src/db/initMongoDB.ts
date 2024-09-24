import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const connectToMongoDB = async () => {
  try {
    const user = env('MONGO_USER');
    const pass = env('MONGO_PASS');
    const url = env('MONGO_URl');
    const db = env('MONGO_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pass}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Connect to mongo db is successfull');
  } catch (e) {
    console.log('Connect to mongo db failed');
    throw e;
  }
};
