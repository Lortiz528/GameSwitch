//dependencies
const express = require('express');
const {
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  createUser,
} = require('../queries/users');

//sub routes
const usersController = express.Router();

//index route
//display all users
usersController.get('/', async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json({ success: true, payload: allUsers });
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no users' });
  }
});

//get one user
usersController.get('/:email', async (req, res) => {
  const { email } = req.params;
  const getUser = await getUserByEmail(email);
  if (getUser[0]) {
    res.status(200).json({ success: true, payload: getUser[0] });
  } else {
    res
      .status(404)
      .json({
        success: false,
        payload: `no user found with email of ${email}`,
      });
  }
});

//update user
usersController.put('/:email', async (req, res) => {
  const { email } = req.params;
  const changeUser = await updateUser(req.body, email);

  if (changeUser.user_email) {
    res.status(200).json({ payload: changeUser });
  } else {
    res.status(404).json('update error');
  }
});

//create user
usersController.post('/newuser', async (req, res) => {
  const addUser = await createUser(req.body);

  if (addUser) {
    res.status(200).json({ success: true, payload: addUser });
  } else {
    res.status(404).send({ success: false, payload: 'create error' });
  }
});

//delete user
usersController.delete('/:email', async (req, res) => {
  const { email } = req.params;
  const removeUser = await deleteUser(email);

  if (removeUser.user_email) {
    res.status(200).json({ success: true, payload: removeUser });
  } else {
    res.status(404).json({ success: false, payload: email });
  }
});

module.exports = usersController;
