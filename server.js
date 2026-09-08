const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Connected Successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });


app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});


app.get("/api", (req, res) => {
  res.json({
    message: "Express API is working!",
  });
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
}


module.exports = app;