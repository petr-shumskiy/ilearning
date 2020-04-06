const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Collection = require('./Collection')

const Item = sequelize.define('Item', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tags: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comments: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0
  }
})

module.exports = Item