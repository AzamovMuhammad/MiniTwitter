const express = require("express");
const app = express();
const cors = require("cors");
const enterRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRouter");
const likeRouter = require("./routes/likePostRouter");
const { commentPost } = require("./controllers/commentController");
const commentRouter = require("./routes/commentsRouter");

// middleware
app.use(cors());
app.use(express.json());

// log_in and sign_in 
app.use('/user', enterRouter)
app.use("/uploads", express.static("uploads"));

// post part 
app.use('/post', profileRouter)

// post uchun like parttt
app.use('/like', likeRouter)

// postlar uchun comments 
app.use('/comment', commentRouter)

const port = 4200
app.listen(port, () => {
    console.log(`Server ${port}-portda ishga tushdi.`);
})
