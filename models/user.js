const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Fix the path to the configuration file
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password); // Fix the parameter name 'loginPw' to 'loginPW'
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER, // Fix the typo 'INTERGER' to 'INTEGER'
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Fix the variable name 'updatedUserData' to 'newUserData'
        return newUserData;
      },
    },
    sequelize,
    timestamps: false, // Fix the typo 'timeStamp' to 'timestamps'
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;