const router = require('express').Router();
const { Present, User } = require('../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const presentData = await Present.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const present = presentData.map((present) => present.get({ plain: true }));

    res.render('homepage', { 
      present, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/present/:id', async (req, res) => {
  try {
    const presentData = await Present.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const present = presentData.get({ plain: true });

    res.render('present', {
      ...present,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Present }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
