const router = require('express').Router();
const { Lists } = require('../../models');

//Adds a new list
router.post('/', async (req, res) => {
  try {
    const listBody = Object.assign(req.body, {user_id: req.session.user_id})
    console.log(listBody);
    const newList = await Lists.create(listBody);
      res.status(200).json(newList);
    // });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
