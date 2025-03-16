const express = require("express");
const app = express();
const cors = require("cors");
const enterRouter = require("./routes/userRoutes");

// middleware
app.use(cors());
app.use(express.json());

// log_in and sign_in 
app.use('/user', enterRouter)
app.use("/uploads", express.static("uploads"));

const port = 4200
app.listen(port, () => {
    console.log(`Server ${port}-portda ishga tushdi.`);
})
