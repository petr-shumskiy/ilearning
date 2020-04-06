const config = require('config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.get('database.schema'),
  config.get('database.user'),
  config.get('database.password'),
  {
    host: config.get('database.host'),
    dialect: 'mysql'
  }
)

module.exports = sequelize