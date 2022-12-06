//import the db object
const db = require("../db/dbConfig.js");

//get all users info from the database
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    console.log(error.message);
  }
};

const getUserByEmail = async (user_email) => {
  try {
    const user = await db.any(
      "SELECT * FROM users where user_email=$1",
      user_email
    );
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (user, email) => {
  const { user_name, user_location, user_avatar, user_password, user_bio } =
    user;
  try {
    const user = await db.one(
      "update users set user_name=$1, user_location=$2,user_avatar=$3 ,user_password=$4, user_bio=$5 where user_email=$6 returning *",
      [user_name, user_location, user_avatar, user_password, user_bio, email]
    );
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (user) => {
  const { user_name, user_email, user_password } = user;

  try {
    const addUser = await db.one(
      "insert into users (user_name,user_email,user_password) values ($1,$2,$3) returning *",
      [user_name, user_email, user_password]
    );
    return addUser;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (user_email) => {
  try {
    const oneUser = await db.one(
      "DELETE FROM users WHERE user_email=$1 RETURNING *",
      user_email
    );
    return oneUser;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};
module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
