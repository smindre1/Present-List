const router = require('express').Router();
const userRoutes = require('./userRoutes');
const presentRoutes = require('./presentRoutes');
const saveRoutes = require('./saveRoutes');

router.use('/users', userRoutes);
router.use('/present', presentRoutes);
router.use('/save', saveRoutes);

module.exports = router;

