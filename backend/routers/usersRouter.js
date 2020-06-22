const express = require('express')
const Router = express.Router()
const auth = require('../models/auth')
const UsersController = require('../controllers/usersController')

Router
    .get('/', auth.isLoggedInAsAdmin, UsersController.getUsers)

module.exports = Router