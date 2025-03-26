const express = require("express");
const {
  likesCountComment,
  likeComment,
  getLikeStatus,
} = require("../controllers/commentLike");
const commentLikeRouter = express.Router();

commentLikeRouter.post("/likeCountComment", likesCountComment);
commentLikeRouter.post("/likecomment", likeComment);
commentLikeRouter.get("/status/:comment_id", getLikeStatus);

module.exports = commentLikeRouter;
