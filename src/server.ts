import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import discussionRoutes from './routes/discussionRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/discussions', discussionRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Discussion Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
