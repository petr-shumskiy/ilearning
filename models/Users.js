const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Collection = require('./Collection')


const Users = sequelize.define('Users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  last_login: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  is_blocked: {
    type: Sequelize.BOOLEAN,
    default: false
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    default: false
  }
})

Users.hasMany(Collection, {as: 'users', foreignKey: 'owner_id'})

module.exports = Users