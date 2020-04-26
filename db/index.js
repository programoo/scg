const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'development.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

db.models.Direction = require('./models/direction.js')(sequelize);
module.exports = db;