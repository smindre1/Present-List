const router = require('express').Router();
const userRoutes = require('./userRoutes');
const presentRoutes = require('./presentRoutes');
const saveRoutes = require('./saveRoutes');
const newListRoutes = require('./newListRoutes')

router.use('/users', userRoutes);
router.use('/present', presentRoutes);
router.use('/save', saveRoutes);
router.use('/newList', newListRoutes);

module.exports = router;

