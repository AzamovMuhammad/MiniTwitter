const express = require("express");
const app = express();
const cors = require("cors");
const enterRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRouter");

// middleware
app.use(cors());
app.use(express.json());

// log_in and sign_in 
app.use('/user', enterRouter)
app.use("/uploads", express.static("uploads"));

// post part 
app.use('/post', profileRouter)

const port = 4200
app.listen(port, () => {
    console.log(`Server ${port}-portda ishga tushdi.`);
})
