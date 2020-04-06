const errorHandler = require('../utils/errorHandler')
const Users = require('../models/Users')
const { Op } = require('sequelize')

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email', 'last_login', 'is_blocked', 'is_admin']
    })
    res.status(200).json({users})
  } catch (error) {
    errorHandler(res,
      400,
      'Cannot fetch users',
      error)
  }
}

const validateUser = async (req, res) => {
  const user = await Users.findByPk(req.user.id)
  const isValid = (user && !user.is_blocked)
  res.status(200).json({isValid, userId: req.user.id})
}

const deleteUsers = async (req, res) => {
    try {
      const {idList} = req.body
      await Users.destroy({where: {
        id: {
          [Op.in]: idList
        }
      }
      })
      res.status(204).json({})
    } catch (error) {
      errorHandler(res,
        400,
        'failed delete users',
        error)
    }
}

const blockUsers = async (req, res) => {
  try {
    const {idList, isBlocked} = req.body
    const users = await Users.findAll({where: {
      id: idList
      }})
    const newUsers = users.map((user) => {
      return {...user.dataValues, is_blocked: isBlocked}
    })
    await Users.bulkCreate(newUsers, {
      updateOnDuplicate:['is_blocked']
      })
    res.status(201).json({})
  } catch (error) {
    errorHandler(res,
      400,
      'failed block users',
      error)
  }
}

module.exports = {
  getUsers,
  deleteUsers,
  blockUsers,
  validateUser
}