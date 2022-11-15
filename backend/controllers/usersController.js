//dependencies
const express = require("express");
const { getAllUsers } = require("../queries/users");

//sub routes
const usersController = express.Router();

//index route
//display all users
usersController.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json({ success: true, payload: allUsers });
  } catch (error) {
    res.status(404).json({ sucess: false, message: "no users" });
  }
});

module.exports = usersController;
