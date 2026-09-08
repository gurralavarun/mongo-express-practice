const express = require("express");
const app = express();
const mongoose = require("mongoose");
const products = require("./models/Product")
app.use(express.static("public"));
const PORT = 5000;
const bcrypt = require("bcrypt");
const User = require("./models/User");

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
        .then(() =>{
            console.log("Mongo Connected Successfully");

            app.listen(PORT, () => {
                console.log(`server is running on http://localhost:${PORT}`);
            });
        })
        .catch(()=>{
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

