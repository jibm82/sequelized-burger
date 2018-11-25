const mysql = require("mysql");
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: process.env.DB_HOST | "localhost",
    post: process.env.DB_PORT | 3306,
    user: process.env.DB_USER | "root",
    password: process.env.DB_PASSWORD | "root",
    database: process.env.DB_NAME | "burgers_db"
  });
}

connection.connect((err) => {
  if (err) {
    console.log(`Error connecting: ${err.stack}`);
    return;
  }

  console.log(`Connected as Id ${connection.threadId}`);
});

module.exports = connection;