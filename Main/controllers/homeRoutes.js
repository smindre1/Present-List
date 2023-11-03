const router = require('express').Router();
const { List, Users } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
   res.render('all');
});

router.get('/', async (req, res) => {
  // This is for seeded data
  try {
    const presentData = await Present.findAll({
      include: [
        {
          model: Users,
          attributes: ['name']
        }
      ]
    });

    const present = presentData.map((present) => present.get({ plain: true }));

    res.render('main', {
      present,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
 });

// router.get('/present/:id', async (req, res) => {
//   try {
//     const presentData = await Present.findByPk(req.params.id, {
//       include: [
//         {
//           model: Users,
//           attributes: ['name']
//         }
//       ]
//     });

//     const present = presentData.get({ plain: true });

//     res.render('present', {
//       ...present,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Present }]
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      layout: "dashboard",
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

 router.get('/login', (req, res) => {
  if (req.session.logged_in) {
   res.redirect('/dashboard');
   return;
 }
  res.render('login');
 });

 router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
   res.redirect('/dashboard');
    return;
 }
  res.render('signup');
 });

module.exports = router;