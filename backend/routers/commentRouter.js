const express = require('express')
const Router = express.Router()
const CommentController = require('../controllers/commentController.js')

Router
    .get('/', CommentController.getComment)
    .post('/', CommentController.createComment)
    .delete('/', CommentController.deleteComment)

module.exports = Router
