const user = require('./userRouter')
const post = require('./postRouter')
const comment = require('./commentRouter')
const session = require('./sessionRouter')
const friendship = require('./friendshipRouter')

module.exports = {
    user,
    post,
    comment,
    session,
    friendship
}
