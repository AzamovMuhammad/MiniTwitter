const express = require('express');
const profileRouter = require('./profileRouter');
const { commentPost } = require('../controllers/commentController');
const commentRouter = express.Router();

commentRouter.post('/commentPost', commentPost)

module.exports = profileRouter;