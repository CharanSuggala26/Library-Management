const exp = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const expHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userApp = exp.Router();
const { verifyToken } = require("../Middleware/authentication");

const registerUser = expHandler(async (req, res) => {
  let user = req.body;
  let usersCollection = req.app.get("usersCollection");
  let username = user.name;
  let dbuser = await usersCollection.findOne({ name: username });
  if (dbuser) {
    return res.send({ status: 400, message: "User already exists!" });
  }
  const hashed = await bcrypt.hash(user.password, 5);

  if (user.userType == "buyer") {
    (user.skills = []), (user.certifications = []);
  }

  const newUser = {
    name: username,
    password: hashed,
    userType: user.userType,
    skills: user.skills,
    certifications: user.certifications,
    portfolio: [],
  };

  await usersCollection.insertOne(newUser);
  return res.send({ status: 200, message: "Successfully Registered!" });
});

const loginUser = expHandler(async (req, res) => {
  let usersCollection = req.app.get("usersCollection");
  let user = req.body;
  let username = user.name;
  let dbuser = await usersCollection.findOne({ name: username });
  if (!dbuser) {
    return res.send({ status: 400, message: "User doesn't exist!" });
  }
  const isverified = await bcrypt.compare(user.password, dbuser.password);
  if (!isverified) {
    return res.send({ status: 400, message: "Enter correct password!" });
  }

  const userID = dbuser._id;
  const dbUsername = dbuser.name;
  const token = jwt.sign({ id: userID, name: dbUsername }, process.env.TOKEN);
  return res.send({
    status: 200,
    token,
    dbUsername,
    message: "Login Successful!",
  });
});

const getUser = expHandler(async (req, res) => {
  let usersCollection = req.app.get("usersCollection");

  const user = req.name;
  const dbUser = await usersCollection.findOne({ name: user });

  return res.send({ dbUser });
});

userApp.post("/register", registerUser);
userApp.post("/login", loginUser);
userApp.get("/type", verifyToken, getUser);

module.exports = userApp;