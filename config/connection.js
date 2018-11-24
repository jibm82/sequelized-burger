const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  post: 3306,
  user: "root",
  password: "",
  database: "burgers_db"
});

connection.connect((err) => {
  if (err) {
    console.log(`Error connecting: ${err.stack}`);
    return;
  }

  console.log(`Connected as Id ${connection.threadId}`);
});

module.exports = connection;