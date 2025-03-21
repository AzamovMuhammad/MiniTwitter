const express = require('express');
const { addUserPost } = require('../controllers/profileController');
const uploadMiddlewarePost = require('../middleware/uploadMiddleware');
const profileRouter = express.Router()

profileRouter.post('/addPost', uploadMiddlewarePost, addUserPost)

module.exports = profileRouter;