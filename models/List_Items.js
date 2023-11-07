const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our List_Items model
class List_Items extends Model {}

// create fields/columns for List_Items model
List_Items.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: true
    },
    present: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // price: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lists',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'list_items'
  }
);

module.exports = List_Items;