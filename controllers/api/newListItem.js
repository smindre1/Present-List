const router = require('express').Router();
const { List_Items } = require('../../models');

//Adds a new list
router.post('/', async (req, res) => {
  try {
    // const listBody = Object.assign(req.body, {user_id: req.session.user_id})
    // console.log(listBody);
    const newRow = await List_Items.create(req.body);
    res.status(200).json(newRow);
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
