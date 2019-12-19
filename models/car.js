'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Car extends Model {
    setStatus(isRented) {
      if(isRented) {
        this.setDataValue('status', 'Unavailable')
      } else {
        this.setDataValue('status', 'Available')
      }
    }
  }
  Car.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    pricePerDay: DataTypes.INTEGER,
    type: DataTypes.STRING,
    isRented: DataTypes.BOOLEAN,
    path_picture: DataTypes.STRING,
    description: DataTypes.TEXT,
    video: DataTypes.TEXT
  }, {hooks: {
    beforeCreate: function(car) {
      let path = car.path_picture.split('/')[2];
      car.setDataValue('path_picture', path);
    }
  },sequelize});
  Car.associate = function(models) {
    // associations can be defined here
    Car.belongsToMany(models.User, {through: models.Rent});
  };
  return Car;
};