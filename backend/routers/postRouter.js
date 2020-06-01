const express = require('express')
const Router = express.Router()
const PostController = require('../controllers/postController.js')

Router
    .get('/', PostController.getPost)
    .post('/', PostController.createPost)
    .put('/', PostController.updatePost)
    .delete('/', PostController.deletePost)

module.exports = Router
