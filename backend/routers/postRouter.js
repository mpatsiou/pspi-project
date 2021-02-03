const express = require('express')
const auth  = require('../models/auth')
const Router = express.Router()
const PostController = require('../controllers/postController.js')

Router
    .get('/', auth.isLoggedIn, PostController.getPost)
    .post('/', auth.isLoggedIn, PostController.createPost)
    .put('/', auth.isLoggedIn, PostController.updatePost)
    .delete('/', auth.isLoggedIn, PostController.deletePost)

module.exports = Router
