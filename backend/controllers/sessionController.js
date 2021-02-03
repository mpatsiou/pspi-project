const auth = require('../models/auth')

const login =  async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({statusText: "Params missing"})
    }

    const user = await auth.authenticate(req.body.username, req.body.password)

    if (!user) {
        return res.status(401).json({statusText: "Wrong username/password"})
    }

    res.json({
        statusText: "User created", 
        user: user,
        sid: await auth.createSession(user.id)
    })
}

const logout =  (req, res) => {
    console.log("See you later")
}

module.exports = {
    login,
    logout
}