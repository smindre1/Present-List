const router = require('express').Router();
const { List_Items } = require('../../models');
const withAuth = require('../../utils/auth');

//Deletes a list item based on the list item's id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const listItem = await List_Items.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!listItem) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(listItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
