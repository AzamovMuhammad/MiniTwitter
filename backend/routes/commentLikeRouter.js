const express = require("express");
const {
  likesCountComment,
  likeComment,
} = require("../controllers/commentLike");
const commentLikeRouter = express.Router();

commentLikeRouter.post("/likeCountComment", likesCountComment);
commentLikeRouter.post("/likecomment", likeComment);

module.exports = commentLikeRouter;
