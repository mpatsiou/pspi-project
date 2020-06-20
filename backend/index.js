const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const Routers = require('./routers/index.js')
const passport = require('./models/auth')

const app = express()

app.use(expressSession({secret: "test", saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use('/user', Routers.user)
app.use('/post', Routers.post)
app.use('/comment', Routers.comment)
app.use('/session', Routers.session)
app.use('/friendship', Routers.friendship)

app.listen(3000)
console.log('Magic is happening...')
