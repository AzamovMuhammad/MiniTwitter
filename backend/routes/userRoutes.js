const express = require('express')
const { signup, login } = require('../controllers/userController')
const { uploadMiddleware } = require('../middleware/uploadMiddleware')
const enterRouter = express.Router()

enterRouter.post('/sign', uploadMiddleware, signup)
enterRouter.post('/login', login)

module.exports = enterRouter;

