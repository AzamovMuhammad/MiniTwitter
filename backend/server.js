const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());


const port = 4200
app.listen(port, () => {
    console.log(`Server ${port}-portda ishga tushdi.`);
})
