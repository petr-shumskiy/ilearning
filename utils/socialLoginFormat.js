const timeNow = require('./timeNow')


const socialLoginFormat = (provider, user) => {
  const newUser = {
    name: user.name,
    email: user.email,
    password: '',
    last_login: timeNow,
    is_blocked: false,
    is_selected: false
  }

  console.log(newUser)

  switch (provider) {
    case 'facebook':
      return {
        newUser,
        expiresIn: user.expiresIn
      }

    case 'google':
      return {
        newUser,
        expiresIn: user.expires_in
      }

    default:
      throw new Error('unexpected defaujlt')

  }
}

module.exports = socialLoginFormat