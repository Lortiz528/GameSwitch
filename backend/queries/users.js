//import the db object
const db = require("../db/dbConfig.js");

//get all users info from the database
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    res.status(404).json({ sucess: false, message: "no users" });
  }
};

module.exports = {
  getAllUsers,
};
