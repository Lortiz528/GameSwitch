//import the db object
const db = require('../db/dbConfig.js')

//get all users info from the database
const getAllUsers = async () => {
  try {
    const allUsers = await db.any('SELECT * FROM users')
    return allUsers
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no users' })
  }
}

const getUserByEmail = async (user_email) => {
  try {
    const user = await db.any(
      'SELECT * FROM users where user_email=$1',
      user_email
    )
    return user
  } catch (error) {
    res.status(404).json({ sucess: false, message: 'no user' })
  }
}

// const updateUser = async (user, user_email) => {
//   const { user_name, user_trade_score, user_location, user_avatar } = user
//   try {
//     const user = await db.one(
//       'update users set user_name=$1, user_trade_score=$2, user_location=$3,user_avatar=$4 where user_email=$1 returning *',
//       [user_name, user_trade_score, user_location, user_avatar]
//     )
//     console.log(user)
//     return user
//   } catch (error) {
//     res.status(404).json({ sucess: false, message: 'no user' })
//   }
// }

// const createUser = async (user) => {
//   const {user_name,user_email,user_password,user_trade_score,user_location,user_avatar} = user
//   try {
//     const addUser = await db.one(
//       'insert into users (user_name,user_email,user_password,user_trade_score,user_location,user_avatar) values ($1,$2,$3,$4,$5,$6) returning *',
//       [
//         user_name,
//         user_email,
//         user_password,
//         user_trade_score,
//         user_location,
//         user_avatar,
//       ]
//     )
//     return addUser
//   } catch (error) {
//     res.status(404).json({ sucess: false, message: 'no user' })
//   }
// }

const deleteUser = async (user_email) => {
  try {
    const oneUser = await db.one(
      'DELETE FROM users WHERE user_email=$1 RETURNING *',
      user_email
    )
    return oneUser
  } catch (error) {
    console.log(error.message || error)
    return error
  }
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
}
