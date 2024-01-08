import express from "express";
import bodyParser from "body-parser";
import db_con from "./database/db_con.js";
import newsRoute from "./news/router.js" 
import usersRoute from "./users/router.js" 

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
//app.use(bodyParser.json())
app.use(express.json());

//api routes
app.use("/user", usersRoute);
app.use("/news", newsRoute);

app.get("/status", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log("server listening on PORT: ", PORT);
});

/* db_con.query("SELECT 1 + 1 AS solution").then((results) => {
  console.log("Response: ", results);
});
 */