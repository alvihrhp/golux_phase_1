'use strict';
const hashPassword = require('../helper/hashPassword');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    birth_year: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: (user) => {
        return hashPassword(user.password)
        .then(newPassword => {
          user.setDataValue('password', newPassword);
        })
      }
    },sequelize});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Car, {through: models.Rent});
  };
  return User;
};