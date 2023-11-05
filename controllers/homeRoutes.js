const router = require('express').Router();
const { Users, Lists, List_Items } = require('./../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   //This is for seeded data
//   try {
//     const presentData = await Present.findAll(
//       /*{
//       include: [
//         {
//           model: Users,
//           attributes: ['name']
//         }
//       ]
//     }*/);

//     const present = presentData.map((present) => present.get({ plain: true }));

//     res.render('main', {
//       present,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

//------------Shane organized Routes for handlebar pages-----------------

const convertData = (rawText, keyName) => {
  let newArray = [];
  for (i = 0; i < rawText.length; i++) {
    newArray.push(keyName);
  }
  console.dir('New Array Data:');
  console.dir(newArray);
};

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
      // plain: true
    }).then(function(everyList) {
      console.dir('List Data (homeRoutes.js):');
      console.dir(everyList);
      lists = everyList;
      // userLists = lists.dataValues;
      //userLists = lists.get({ plain: true });
    });

    lists = {lists: lists};

    // const lists = listData.get({ plain: true });
    console.dir('Lists Data 2 (homeRoutes.js):');
    console.dir(lists);

    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });
    console.dir('User Data (homeRoutes.js):');
    console.dir(user);
    console.dir("-------------------------------")
    res.render('profile', {
      ...lists,
      ...user,
      // ...listData,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Gets the User's List Data After they selected the list from their lists
router.get('/List:id', async (req, res) => {
  try {
    const listData = await Lists.findAll({
      include: [
        {
          model: Lists
          //attributes: ['name']
        }
      ]
    });

    const list = listData.map((list) => list.get({ plain: true }));

    res.render('main', {
      list,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Gets the individual present data
router.get('/Present/:id', async (req, res) => {
  try {
    const presentData = await List_Items.findByPk(req.params.id, {
      include: [
        {
          model: List_Items
          //attributes: ['name']
        }
      ]
    });

    const present = presentData.get({ plain: true });

    //What is '...' for?
    res.render('present', {
      ...present,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
