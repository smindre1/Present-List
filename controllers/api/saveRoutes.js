const router = require('express').Router();
const { List_Items } = require('../../models');

//Saves any changes the user makes the the table
router.post('/', async (req, res) => {
    try {
        const instances = Number(req.body[0].NumOfRows);
        req.body.splice(0, 1);
        for(i=0; i < instances; i++){
            const item = req.body[i];
            const primaryKey = Number(req.body[i].id);
            const listItem = await List_Items.findByPk(primaryKey);
            listItem.set({
                recipient: item.recipient,
                price: item.price,
                present: item.present,
                date: item.date
            });
            await listItem.save();
        }
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });




module.exports = router;