import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db_con from "../database/db_con.js";
const saltRounds = 10;

/**
 * @description Looks up user on id returns user object
 */

async function lookupUser(id) {
  let sql = "select * from users where id = ?";
  let [results] = await db_con.query(sql, [id]);
  return results[0];
}

/**
 * @description Create user
 * @route POST /user
 */

export const createUser = async function (req, res) {
  let { username, password, email, firstname, lastname, phone } = req.body;
  let sql = "select id from users where username = ? or email = ?";
  let [results] = await db_con.query(sql, [username, email]);
  if (results.length != 0) {
    return res.status(500).json({ message: "username or email already used!" });
  } else {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        let sql = "insert into users(username, password, email) values(?,?,?)";
        db_con.query(sql, [username, hash, email]);
      });
    });
    return res.status(200).json({ message: "User Created" });
  }
};

/**
 * @description Get All users
 * @route GET /user
 */
export const getAllUsers = async function (req, res) {
  let sql = "select * from users";
  let [results] = await db_con.query(sql);
  if (!results.lenght == 0)
    return res.status(204).json({ message: "empty list" });
  return res.status(200).json({ users: results });
};

/**
 * @description Get Single user
 * @route GET /user/:id
 */
export const getUser = async function (req, res) {
  let userId = parseInt(req.params.id);
  let user = await lookupUser(userId);
  if (!user) return res.status(404).json({ message: "user not found!" });
  return res.status(200).json(user);
};

/**
 * @description Update users editable fields
 * @route PUT /user/:id
 */
export const updateUser = async function (req, res) {
  let userId = parseInt(req.params.id);
  let { firstname, lastname, phone } = req.body;
  if (!firstname || !lastname || !phone || !userId)
    return res.status(400).json({ message: "all fields are required" });
  let user = await lookupUser(userId);
  if (!user) return res.status(404).json({ message: "user not found!" });
  let sql =
    "UPDATE users SET firstname = ?, lastname = ?,phone = ? where id = ?";
  await db_con.query(sql, [firstname, lastname, phone, userId]);
  return res.status(200).json({ message: "user has been updated" });
};

/**
 * @description Delete user, can be only done if admin or user self
 * @route DELETE /user/:id
 */

export const deleteUser = async function (req, res) {
  let userId = parseInt(req.params.id);
  if (!userId)
    return res.status(400).json({ message: "all fields are required" });
  let user = await lookupUser(userId);
  if (!user) return res.status(404).json({ message: "user not found!" });

  let sql = "DELETE FROM users WHERE id = ?";
  await db_con.query(sql, [userId]);

  return res.status(200).json({ message: "user has been deleted" });
};

/**
 * @description login user, returns token
 * @route POST /user/login
 */

export const loginUser = async function (req, res) {
  let { username, password } = req.body;
  let sql = "Select * from users where username = ?";
  let [user] = await db_con.query(sql, [username]);
  if (!user) return res.status(404).json({ message: "incorrect username" });
  let testAgainst = user[0].password;
  bcrypt.compare(password, testAgainst, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result) {
      const token = jwt.sign(
        { username: user[0].username, userId: user[0].id },
        process.env.JWT_SECRET,
        {
          expiresIn: "8h",
        }
      );
      return res.status(200).json({
        message: "succes",
        token: token,
        expiry: 28800,
      });
    } else {
      return res.status(401).json({ message: "invalid credentials" });
    }
  });
};

/**
 * @description Get users on username
 * @route GET /user/search
 */

export const searchUser = async function(req, res){
  let filter = req.query;
  let sql = "select * from users where username like CONCAT('%',?,'%')";
  let [results]  = await db_con.query(sql, filter.username)
  if(results.length == 0) return res.status(204).json({message: "empty list"});
  return res.status(200).json({users: results})
}