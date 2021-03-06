const users = require('../models/user')
const session = require('../models/auth')

const getUser = async (req, res) => {
    const user = await (users.getById(req.query.id))

    if (user) {
        res.json({ user })
        return
    }

    res.status(404).json({
        statusText: "User not found"
    })
}

const createUser = async (req, res) => {
    const required = ['email', 'username', 'password', 'name', 'surname']
    for (param of required) {
        if (!req.body[param]) {
            res.status(400).json({statusText: "Params missing"})
            return
        }
    }

    try {
        const id = await users.createUser(req.body.email, req.body.username, req.body.password, req.body.name, req.body.surname)

        res.json({
            statusText: "User created", 
            user: await users.getById(id),
            sid: await session.createSession(id)
        })
    }
    catch (e) {
        console.error(e)
        res.status(400).json({"statusText": e})
    }
}

const updateUser =  async (req, res) => {
    const optional = ['email', 'username', 'password', 'name', 'surname']
    const forUpdate =  []

    if (!req.body.id) {
        res.status(400).json('No id given')
        return
    }

    for (const k of optional) {
        if (req.body[k]) {
            forUpdate[k] = req.body[k]
        }
    }

    await users.updateUser(req.body.id, forUpdate)
    res.json({
        status: "200",
        statusText: "Updating user"
    })
}

const deleteUser = async (req, res) => {
    await users.deleteUser(req.body.id)
    res.json({statusText: "User deleted"})
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}
