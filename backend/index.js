const express = require('express')
const bodyParser = require('body-parser')
const Routers = require('./routers/index.js')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/user', Routers.user)
app.use('/users', Routers.users)
app.use('/post', Routers.post)
app.use('/comment', Routers.comment)
app.use('/session', Routers.session)
app.use('/friendship', Routers.friendship)

app.listen(3000)
console.log('Magic is happening...')