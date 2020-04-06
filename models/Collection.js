const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Item = require('./Item')

const Collection = sequelize.define('Collection', {
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
  theme: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  img: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

Collection.hasMany(Item, {as: 'collections', foreignKey: 'collection_id'})

module.exports = Collection