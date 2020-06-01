const express = require('express')
const Router = express.Router()
const FriendshipController = require('../controllers/friendshipController.js')

Router
    .get('/', FriendshipController.getFriendship)
    .post('/', FriendshipController.createFriendship)
    .delete('/', FriendshipController.deleteFriendship)

module.exports = Router
