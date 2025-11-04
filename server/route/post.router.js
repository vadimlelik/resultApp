import { Router } from 'express';
import { Post } from '../model/post.model.js';
import { isAuth } from '../midleaweare/isAuth.js';

export const postRouter = Router();

postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
postRouter.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
postRouter.get('/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
postRouter.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send('deleted');
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
postRouter.patch('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true },
    );
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
