const express = require('express')
const { likeCond, likesCount } = require('../controllers/likeCountroller')
const likeRouter = express.Router()

likeRouter.post('/likesC', likesCount)
likeRouter.post('/likes', likeCond)

module.exports = likeRouter