const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Direction extends Sequelize.Model {}
  Direction.init({
    sourceTitle: Sequelize.STRING,
    destinationTitle: Sequelize.STRING,
    sourceLng: Sequelize.DECIMAL(10, 8),
    sourceLat: Sequelize.DECIMAL(10, 8),
    destinationLng: Sequelize.DECIMAL(10, 8),
    destinationLat: Sequelize.DECIMAL(10, 8)
  }, { sequelize });

  return Direction;
};