const express = require('express');
const { userFavPost } = require('../controllers/userFavController');
const userFavRouter = express.Router()

userFavRouter.post('/userFav', userFavPost)

module.exports = userFavRouter;