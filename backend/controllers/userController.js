const user = require('../models/user')

const getUser =  (req, res) => {
    console.log(req.params);
    //console.log(user.getUser(req.params));
}

const createUser = (req, res) => {
    user.createUser(req.body.email, req.body.username, req.body.password, req.body.name, req.body.surname)
    res.json({statusText: "User creating"});
}

const updateUser =  (req, res) => {
    console.log("updating User")
}

const deleteUser =  (req, res) => {
    user.deleteUser(req.body.id)
    res.json({statusText: "User deleting"})
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}
