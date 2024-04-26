// npm run server -> for backend 


// const express = require("express");
// const dotenv = require("dotenv");

// ........................................................................
// both server run on => npm start 

import path from "path";

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { app, server } from "./socket/socket.js";

// const app = express();


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();  // __dirname gives us absolute root folder path.

dotenv.config();

app.use(express.json())  // to parse the incoming requests with JSON payloads (from req.body) 
app.use(cookieParser()); // to access cookies in our application 

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// with this we can run our frontend and server(backend) as well...
app.use(express.static(path.join(__dirname, "/frontend/dist"))); // here express.static acts as a middleware to get the static folder.

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))   // both frontend and backend run on same server because of the line... adding 
})


// app.get("/", (req, res) => {
//     // root route http://localhost:5000/ 
//     res.send("Hello World!");
// });


// app.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server Running on port ${PORT}`)
// });

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});





