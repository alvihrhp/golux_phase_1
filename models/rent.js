'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Rent extends Model {}
  Rent.init({
    UserId: DataTypes.INTEGER,
    CarId: DataTypes.INTEGER,
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE
  }, {sequelize});
  Rent.associate = function(models) {
    // associations can be defined here
    Rent.belongsTo(models.Car);
    Rent.belongsTo(models.User);
  };
  return Rent;
};