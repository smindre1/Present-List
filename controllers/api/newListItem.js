const router = require('express').Router();
const { List_Items } = require('../../models');

//Adds a new list item, which is perceived as a list row
router.post('/', async (req, res) => {
  try {
    const newRow = await List_Items.create(req.body);
    res.status(200).json(newRow);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
