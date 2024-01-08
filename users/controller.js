import bcrypt from "bcrypt";
import db_con from "../database/db_con.js";
const saltRounds = 10;

export const createUser = async function (req, res) {
  let { username, password, email } = req.body;
  let sql = "select id from users where username = ? or email = ?";
  let [results] = await db_con.query(sql, [username, email]);
  console.log(results);
  if (results[0] != null) {
    res.status(500).json({ message: "username or email already used!" });
  }
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      let sql = "insert into users(username, password, email) values(?,?,?)";
      db_con.query(sql, [username, hash, email]);
    });
  });
  res.status(200).json({ message: "User Created" });
};
