const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportJwt = require('./middlewares/passport-jwt')
//const passportFacebook = require('./middlewares/passport-facebook')
const path = require('path')
const config = require('config')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./utils/database')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const collectionRoutes = require('./routes/collections')
const PORT =  process.env.PORT || config.get('port')
const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(passport.initialize())
passportJwt(passport)
// passportFacebook(passport)


// passport.serializeUser((user, cb) => {
//   cb(null, user)
// })
//
// passport.deserializeUser((user, done) => {
//   done(null, user)
// })

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/collection', collectionRoutes)

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
  res.sendFile( (path.join(__dirname, 'client', 'build')) + '/index.html')
})

async function start() {
  try {
    await sequelize.sync()
    console.log('*Database* Connection has been established successfully')
    app.listen(PORT, () => console.log(`*Server* App has been started on port ${PORT}`))
  } catch (e) {
    console.log('Unable to connect to the database', e)
  }
}

start()