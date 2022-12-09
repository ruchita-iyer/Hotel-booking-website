const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser")

const app = express()


const connect = async () => {
    try{
        await mongoose.connect(process.env.url)
        console.log("mongo connected")
    
    }
    catch(error){
        throw error
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("disconnected")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", require( "./routes/auth"));
app.use("/api/users", require( "./routes/users"));
app.use("/api/hotels", require( "./routes/hotels"))
app.use("/api/rooms", require( "./routes/rooms"));

app.use((err, req, res, next) =>{
    const errorStatus= err.status ||500
    const errorMessage= err.message || "wrong"
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(5000, ()=>{
    connect()
    console.log("connected");
})