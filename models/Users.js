const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Users model
class Users extends Model {}

// create fields/columns for Users model
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {type: DataTypes.STRING,
      allowNull: false,
      unique: true

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'users'
  }
);

module.exports = Users;