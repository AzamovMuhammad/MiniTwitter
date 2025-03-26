const express = require('express')
const { likeCond, likesCount, getLikeStatus } = require('../controllers/likeCountroller')
const likeRouter = express.Router()

likeRouter.post('/likesC', likesCount)
likeRouter.post('/likes', likeCond)
likeRouter.get("/status/:post_id", getLikeStatus);

module.exports = likeRouter