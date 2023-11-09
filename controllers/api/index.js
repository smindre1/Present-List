const router = require('express').Router();
const userRoutes = require('./userRoutes');
const delListItemRoutes = require('./deleteListItem');
const saveRoutes = require('./saveRoutes');
const newListRoutes = require('./newListRoutes')
const newRow = require('./newListItem')
const deleteList = require('./deleteListRoutes');

router.use('/users', userRoutes);
router.use('/save', saveRoutes);
router.use('/newList', newListRoutes);
router.use('/newRow', newRow);
router.use('/deleteListItem', delListItemRoutes);
router.use('/deleteList', deleteList);

module.exports = router;

