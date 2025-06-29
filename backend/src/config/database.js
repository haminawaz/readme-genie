import { set, connect } from 'mongoose';
import { configurations } from './config';

set('strictQuery', false);

const connectDB = async () => {
  try {
    await connect(configurations.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default { connectDB };
