const router = require('express').Router();
const userRoutes = require('./userRoutes');
const presentRoutes = require('./presentRoutes');

router.use('/users', userRoutes);
router.use('/present', presentRoutes);

module.exports = router;

