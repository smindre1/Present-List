const router = require('express').Router();
const { Present } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPresent = await Present.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPresent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {

    const presentData = await Lists.destroy({
      where: {
        listid: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!presentData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(presentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

