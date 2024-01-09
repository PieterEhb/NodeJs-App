import bcrypt from "bcrypt";
import db_con from "../database/db_con.js";
const saltRounds = 10;

async function lookupUser(id) {
  let sql = "select * from users where id = ?";
  let [results] = await db_con.query(sql, [id]);
  return results[0];
};

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

export const getAllUsers = async function (req, res) {
  let sql = "select * from users";
  let [results] = await db_con.query(sql);
  if (!results.lenght == 0)
    return res.status(204).json({ message: "empty list" });
  return res.status(200).json({ users: results });
};

export const getUser = async function (req, res) {
  let userId = parseInt(req.params.id)
  let user = await lookupUser(userId);
  if (!user) return res.status(404).json({ message: "user not found!" });
  return res.status(200).json(user);
};

export const updateUser = async function (req, res) {
  let userId = parseInt(req.params.id)
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

export const deleteUser = async function (req, res) {
  let userId = parseInt(req.params.id)
  if (!userId)
    return res.status(400).json({ message: "all fields are required" });
  let user = await lookupUser(userId);
  if (!user) return res.status(404).json({ message: "user not found!" });

  let sql = "DELETE FROM users WHERE id = ?";
  await db_con.query(sql, [userId]);

  return res.status(200).json({ message: "user has been deleted" });
};
