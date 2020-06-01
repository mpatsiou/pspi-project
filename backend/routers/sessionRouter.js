const express = require('express')
const Router = express.Router()
const SessionController = require('../controllers/sessionController.js')

Router
    .post('/', SessionController.login)
    .delete('/', SessionController.logout)

module.exports = Router
