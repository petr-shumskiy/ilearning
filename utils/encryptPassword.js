const bcrypt = require('bcrypt')

function encryptPassword(password, rounds=10) {
  const salt = bcrypt.genSaltSync(rounds)
  return bcrypt.hashSync(password, salt)
}

module.exports = encryptPassword