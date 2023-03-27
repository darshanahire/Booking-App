//main server.js File

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
require("dotenv").config();


//connection to database
require('./db/conn')


const cookieParser = require("cookie-parser");
const router=require('./routes/route');



app.use(cors())
app.use(express.json());
app.use(cookieParser());

//all the routs are present in router file
app.use(router)


// client is connected from here
app.use(express.static("client/build"));
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})


//server started on port 5000
app.listen(PORT, () => {
    console.log(`server listion on port :`, PORT);
})