const express = require('express');
const { addUserPost, getUserPost } = require('../controllers/profileController');
const uploadMiddlewarePost = require('../middleware/uploadMiddleware');
const profileRouter = express.Router()

profileRouter.post('/addPost', uploadMiddlewarePost, addUserPost)
profileRouter.post('/getPosts', getUserPost)

module.exports = profileRouter;