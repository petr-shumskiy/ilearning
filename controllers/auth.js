const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailValidator = require('email-validator')
const config = require('config')
const errorHandler = require('../utils/errorHandler')
const encryptPassword = require('../utils/encryptPassword')
const Users = require('../models/Users')
const socialLoginFormat = require('../utils/socialLoginFormat')
const timeNow = require('../utils/timeNow')


const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await Users.findOne({where: { email }})
    if (!user) {
      errorHandler(res,
        404,
        'User with this email does not exist')
    }

    if (user.is_blocked) {
      errorHandler(res,
        409,
        'It seems you blocked')
    }

    const isPasswordTrue = bcrypt.compareSync(password, user.password)
    if (isPasswordTrue) {
      const token = jwt.sign(
        { id: user.id },
        config.get('jwtKey'),
        {expiresIn: '1h'}
        )
      user.last_login = timeNow
      user.save()
      res.status(200).json({
        message: 'login success',
        token: `Bearer ${token}`
      })
    } else {
        errorHandler(res, 401, 'Wrong password')
      }
  } catch (error) {
    errorHandler(res, 500, 'failed login into system', error)
  }
}


const socialLogin = (provider) => async (req, res) => {
  const {newUser, expiresIn} = socialLoginFormat(provider, req.body)
  let id
  try {
    const candidate = await Users.findOne({where: {
      email: newUser.email,
      }})
    if (!candidate) {
      console.log('IF CANDIDATA', newUser)
      const user  = await Users.create(newUser)
      id = user.id
    } else if (candidate.is_blocked) {
      errorHandler(res,
        409,
        'It seems you blocked')
      return
    } else {
      console.log('ELSE CANDITATE \n', candidate)
      id = candidate.id
      await Users.update({
        last_login: timeNow}, { where: { email: newUser.email }
      })
    }
    const token = jwt.sign(
      { id },
      config.get('jwtKey'),
      { expiresIn })

    res.status(201).json({token: `Bearer ${token}`})
  } catch (error) {
    console.log(error)
    errorHandler(res,
      400,
      'failed login with ' + provider,
      error)
  }
}


const register = async (req, res) => {
  try {
    const {name, email, password, passwordValidation} = req.body
    const isEmailValid = emailValidator.validate(email)
    const candidate = await Users.findOne({where: {email}})

    if (password !== passwordValidation|| !isEmailValid || !name || password.length < 6) {
      return errorHandler(res, 400, 'Invalid registration data')
    }

    if (candidate) {
      errorHandler(res, 409, 'User with this email already exists')
    } else {
      const user = await Users.create({
      name,
      email,
      password: encryptPassword(password),
      last_login: timeNow,
      is_selected: false,
      is_blocked: false
    })
      res.status(201).json({
      message: `user ${user.name} has successfully created`,
      user: {
        name: user.name,
        email: user.email
      }
    })}
  } catch (error) {
    errorHandler(res, 500, 'failed register', error)
  }
}

module.exports = {
  login,
  register,
  socialLogin
}
