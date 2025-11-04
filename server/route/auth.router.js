import { Router } from 'express';
import { User } from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// jwt, bcrypt

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: 'Пользователь с таким email уже существует',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
    });

    const { password: _, ...userData } = user.toObject();
    res.status(201).send({
      message: 'Пользователь успешно зарегистрирован',
      user: userData,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: 'Пользователь не найден',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        message: 'Неверный пароль',
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('token', token, {
      httpOnly: true,
    });
    const { password: _, ...userData } = user.toObject();
    res.status(200).send({
      message: 'Пользователь успешно авторизован',
      user: userData,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
authRouter.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).send({
      message: 'Пользователь успешно вышел',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
authRouter.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({
        message: 'Пользователь не авторизован',
      });
    }
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
