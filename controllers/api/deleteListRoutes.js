const router = require('express').Router();
const { Lists } = require('../../models');
const withAuth = require('../../utils/auth');

//Deletes a list based on the list's id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const list = await Lists.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!list) {
      res.status(404).json({ message: 'No list found with this id!' });
      return;
    }

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
