import express from "express";
import db_con  from "./database/db_con.js";
import newsRoute from "./news/router.js" ;
import usersRoute from "./users/router.js" ;

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//api routes
app.use("/news", newsRoute);
app.use("/user", usersRoute);


app.listen(PORT, () => {
  console.log("server listening on PORT: ", PORT);
});


//test call
app.get("/status", (req, res) => {
  res.json({ message: "Hello, World!" });
});


 db_con.query("SELECT 1 + 1 AS solution").then((results) => {
  console.log("Response: ", results);
});
