import mongoose, { ConnectOptions, Error } from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  try {
    await mongoose.connect(MONGODB_URI, options as ConnectOptions);

    console.log('Database connected');
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw new Error('Error connecting to database');
  }
};

export default dbConnection;
