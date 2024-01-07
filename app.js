const express = require("express");
const bodyParser = require("body-parser");
const db_con = require("./database/db_con");

const app = express();
const PORT = process.env.PORT || 3000;

//app.use(bodyParser.json())
app.use(express.json());

app.get("/status", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log("server listening on PORT: ", PORT);
});

db_con.query("SELECT 1 + 1 AS solution").then((results) => {
  console.log("Response: ", results);
});
