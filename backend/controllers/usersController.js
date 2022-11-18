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

// usersController.get('/:id', async (req, res) => {
//   const { id } = req.params
//   const addUser = await updateUser(id)
//   if (addUser[0]) {
//     res.status(200).json({ success: true, payload: users[0] })
//   } else {
//     res.status(404).json({ success: false, payload: 'not found' })
//   }
// })



module.exports = usersController;
