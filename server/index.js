import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { postRouter } from './route/post.router.js';
import { authRouter } from './route/auth.router.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(express.static(join(__dirname, 'dist')));
app.get('/^(?!/api).*/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/auth', authRouter);

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
  });
  try {
  } catch (error) {
    console.log(error);
  }
};

start();
