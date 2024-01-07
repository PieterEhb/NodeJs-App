const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log("server listening on PORT: ", PORT);
})

app.get("/status",(request, response) =>{
    const status = {
        "status":"Running"
    };
    response.send(status)
});

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'node_app',
 'Test',
 'Test1234',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });