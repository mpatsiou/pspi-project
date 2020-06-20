const auth = require('../models/auth')

const login =  (req, res) => {
    const {username, email, name, surname } = req.user

    res.send({user: {
        username,
        email,
        name,
        surname
    }})
}

const logout =  (req, res) => {
    console.log("See you later")
}

module.exports = {
    login,
    logout
}