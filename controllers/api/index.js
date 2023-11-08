const router = require('express').Router();
const userRoutes = require('./userRoutes');
const presentRoutes = require('./presentRoutes');
const saveRoutes = require('./saveRoutes');
const newListRoutes = require('./newListRoutes')
const newRow = require('./newListItem')

router.use('/users', userRoutes);
router.use('/present', presentRoutes);
router.use('/save', saveRoutes);
router.use('/newList', newListRoutes);
router.use('/newRow', newRow);

module.exports = router;

