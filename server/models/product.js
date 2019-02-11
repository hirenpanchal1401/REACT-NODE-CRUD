'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    productName: DataTypes.STRING,
    prize: DataTypes.NUMBER,
    quantity: DataTypes.NUMBER,
    totalAmount: DataTypes.NUMBER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};