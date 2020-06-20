const express = require('express')
const auth = require('../models/auth')
const Router = express.Router()
const SessionController = require('../controllers/sessionController.js')

Router
    .post('/', auth.authenticate('local'), SessionController.login)
    .delete('/', SessionController.logout)

module.exports = Router