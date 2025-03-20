const express = require('express');
const { addUserPost } = require('../controllers/profileController');
const profileRouter = express.Router()

profileRouter.post('/addPost', addUserPost)

module.exports = profileRouter;