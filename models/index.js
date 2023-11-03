const Users = require('./Users');
const Lists = require('./Lists');
const List_Items = require('./List_Items');



Users.hasOne(Lists, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Lists.hasOne(List_Items, {
  foreignKey: 'list_id',
  onDelete: 'CASCADE'
});

module.exports = { Users, Lists, List_Items };
