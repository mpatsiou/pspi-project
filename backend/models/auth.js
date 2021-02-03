const crypto = require('crypto');
const db = require('./db')
const User = require('./user')

const createSession = async (user_id) => {
    const sessionId = genHash()
    await db('sessions').insert({ user_id, session_id: sessionId })

    return sessionId
}

const isLoggedIn = async (req, res, done) => {
    if (!req.get('sid')) {
        return res.status(401).send("Unauthorized")
    }

    const d = await (db('sessions').select('user_id').where({session_id: req.get('sid')}))
    if (d.length == 0) {
        return res.status(401).send("Unauthorized")
    }

    const { user_id } = d[0]
    req.user = (await db('users').select().where({ id: user_id }))[0]

    done()
}

const isLoggedInAsAdmin = async (req, res, done) => {
    if (!req.get('sid')) {
        return res.status(401).send("Unauthorized")
    }

    const d = await (db('sessions').select('user_id').where({session_id: req.get('sid')}))
    if (d.length == 0) {
        return res.status(401).send("Unauthorized")
    }

    const { user_id } = d[0]
    req.user = (await db('users').select().where({ id: user_id }))[0]

    if (req.user.role != 'admin') {
        return res.status(401).send("Unauthorized")
    }

    done()
}

const authenticate = async (username, password) => {
    const user = await db('users').select('id').where({username, password})

    return user.length == 0 ? false : User.getById(user[0].id)
}

const genHash = () => {
    const current_date = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

const delSession = async (user_id) => {
    return db('sessions').delete().where({user_id})
}

module.exports = {
    isLoggedInAsAdmin,
    isLoggedIn,
    authenticate,
    delSession,
    createSession,
}