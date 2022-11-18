//dependencies
const express = require("express");
const { getAllUsers, getUserByEmail, updateUser} = require("../queries/users");

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

usersController.get('/:email', async (req, res) => {
  const { email } = req.params
  const addUser = await getUserByEmail(email)
  if (addUser[0]) {
    res.status(200).json({ success: true, payload: addUser[0] })
  } else {
    res.status(404).json({ success: false, payload: 'not found' })
  }
})



module.exports = usersController;
