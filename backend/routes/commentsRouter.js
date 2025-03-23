const express = require('express');
const profileRouter = require('./profileRouter');
const { commentPost, getComments } = require('../controllers/commentController');
const commentRouter = express.Router();

commentRouter.post('/commentPost', commentPost)
commentRouter.post('/getComment', getComments)

module.exports = commentRouter;