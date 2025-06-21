import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoutes from './routes/books.js';
import memberRoutes from './routes/members.js';
import loanRoutes from './routes/loans.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/loans', loanRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});