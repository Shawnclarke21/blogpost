const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] },
      include: [
        { model: Post, attributes: ['id', 'title', 'post_text', 'created_at'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: { model: Post, attributes: ['title'] }
        }
      ]
    });

    if (!user) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/logout', withAuth, (req, res) => {
  req.session.destroy(() => res.status(204).end());
});


router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      individualHooks: true,
      where: { id: req.params.id }
    });

    if (!updatedUser[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedUser = await User.destroy({ where: { id: req.params.id } });

    if (!deletedUser) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }

    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;