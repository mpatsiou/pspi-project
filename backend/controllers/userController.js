const users = require('../models/user')

const getUser =  async (req, res) => {
    user = await (users.getUser(req.query.id))
    console.log(user);

    res.json({statusText: "Getting user"})
}

const createUser = (req, res) => {
    users.createUser(req.body.email, req.body.username, req.body.password, req.body.name, req.body.surname)
    res.json({statusText: "User creating"})
}

const updateUser =  (req, res) => {
    users.updateUser(req.body)
    res.json({
        status: "200",
        statusText: "Updating user"
    })
}

const deleteUser =  (req, res) => {
    users.deleteUser(req.body.id)
    res.json({statusText: "User deleting"})
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}
