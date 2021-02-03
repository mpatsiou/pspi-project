const user = require('./userRouter')
const users = require('./usersRouter')
const post = require('./postRouter')
const comment = require('./commentRouter')
const session = require('./sessionRouter')
const friendship = require('./friendshipRouter')

module.exports = {
    user,
    users,
    post,
    comment,
    session,
    friendship
}
