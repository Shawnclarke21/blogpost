const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'post_text', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: { model: User, attributes: ['username'] }
        }
      ]
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'post_text', 'title', 'created_at'],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: { model: User, attributes: ['username'] }
        }
      ]
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id
    });

    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, { where: { id: req.params.id } });

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({ where: { id: req.params.id } });

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;