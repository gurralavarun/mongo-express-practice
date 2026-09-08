const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const products = require("./models/Product")
app.use(express.static("public"));
const PORT = 5000;
const bcrypt = require("bcrypt");
const User = require("./models/User");

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
        .then(() =>{
            console.log("Mongo Connected Successfully");

            app.listen(PORT, () => {
                console.log(`server is running on http://localhost:${PORT}`);
            });
        })
        .catch((error)=>{
            console.error("MongoDB connection failed", error);
        });


app.post("/register", async (req, res) => {
    try{
        const{username, password} = req.body;

        const hashedPassword =  await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            message: "User registered successfully"
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: "Registration failed"
        });
    }
});

