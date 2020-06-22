const User = require('../models/user' )

const getUsers = async (_, res) => {
    const users = await User.getAll()
    res.json(users)
}

module.exports ={
    getUsers,
}