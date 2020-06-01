const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/userController')

Router
    .get('/', UserController.getUser)
    .post('/', UserController.createUser)
    .put('/', UserController.updateUser)
    .delete('/', UserController.deleteUser)

module.exports = Router
