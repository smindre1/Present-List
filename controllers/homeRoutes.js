const router = require('express').Router();
const { Users, Lists, List_Items } = require('./../models');
const withAuth = require('../utils/auth');

//The mainpage. Usually homepage.
router.get('/', async (req, res) => {
  //Should create a homepage to explain sites purpose. Replace login with new handlebar
  res.render('homepage');
});

//Loads the Signup Page View
router.get('/signup', async (req, res) => {
  res.render('signup');
});

//Loads /login page, where after loging in brings the user to the /profile Page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    //Redirects to /profile view when session is logged in
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

//The Users profile page is loaded if they are still, or just, logged in.
router.get('/profile', withAuth, async (req, res) => {
  try {
    let lists;
    const listData = await Lists.findAll({
      where: {
        user_id: req.session.user_id
      },
      raw: true,
      nest: true
    }).then(function(everyList) {
      lists = everyList;
    });

    console.dir('Lists Data (homeRoutes.js):');
    console.dir(lists);

    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });
    // console.dir('User Data (homeRoutes.js):');
    // console.dir(user);
    // console.dir('-------------------------------');
    res.render('profile', {
      lists,
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Gets the User's List Data After they selected the list from their lists
router.get('/List/:id', async (req, res) => {
  try {
    const listData = await List_Items.findAll({
      where: {
        list_id: req.params.id
      }
    });

    //const listD = listData.map((list) => list.get({ plain: true }));
    // console.log('list Data', listData);
    res.json(listData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
