const express = require('express')
const Router = express.Router()
const auth = require('../models/auth')
const UserController = require('../controllers/userController')

Router
    .get('/', UserController.getUser)
    .post('/', UserController.createUser)
    .put('/', UserController.updateUser)
    .delete('/', auth.isLoggedInAsAdmin, UserController.deleteUser)

module.exports = Router
