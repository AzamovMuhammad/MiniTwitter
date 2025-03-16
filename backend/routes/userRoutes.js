const express = require('express')
const { signup, login } = require('../controllers/userController')
const enterRouter = express.Router()

enterRouter.post('/sign', signup)
enterRouter.post('/login', login)

module.exports = enterRouter;

