// const config = require('config')
// const Users = require('../models/Users')
// const FaceBookStrategy = require('passport-facebook')
//
// const timeNow = new Intl.DateTimeFormat('en', {
//   hour12: false,
//   year: 'numeric',
//   month: 'short',
//   day: '2-digit',
//   hour: 'numeric',
//   minute: '2-digit'
//
// }).format(Date.now())
//
// const passportFacebook = (passport) => {
//   passport.use(
//     new FaceBookStrategy({
//         clientID: config.get('facebook.clientID'),
//         clientSecret: config.get('facebook.clientSecret'),
//         callbackURL: config.get('facebook.callbackURL'),
//         profileFields: ['id', 'first_name', 'email']
//       },
//       async (accessToken, refreshToken, profile, cb) => {
//         try {
//           const user = await Users.findOrCreate({ where: {
//               id: profile.id,
//               name: profile._json.first_name,
//               email: profile._json.email,
//               password: '',
//               last_login: timeNow,
//               is_blocked: false,
//               is_selected: false}})
//           if (user) {
//             return cb(null, user)
//           } else {
//             return cb(null, false)
//           }
//         } catch (e) {
//           console.log(e)
//         }
//     })
//   )
// }
//
// module.exports = passportFacebook