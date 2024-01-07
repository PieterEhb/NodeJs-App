//initialising global objects to use functions from installed packages(bcrypt, mysql,...)
//for db connection
const mysql = require("mysql");

//define connection variable
let db_con = mysql.createConnection({
    host: "localHost",
    user: "Test",
    password: "Test1234",
    database: "node_app",
  });
  
  //Open connection DB
  //db_con.connect(function (err) {
   // if (err) console.log(err);
   // console.log("Connected!");
  //});
  function keepAlive(){
    db_con.query( "SELECT 1", function(err, rows) {
          if (err) {
              console.log("QUERY ERROR: " + err);
          }
        console.log("con tested")
        });
    };

  setInterval(keepAlive, 30000);

  module.exports = db_con;