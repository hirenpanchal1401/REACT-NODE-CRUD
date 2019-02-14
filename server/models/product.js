'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
    productName: DataTypes.STRING,
    productId : DataTypes.STRING,
    prize: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};