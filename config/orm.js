const connection = require("./connection");

const orm = {
  selectAll: function (table, callback) {
    let queryString = `SELECT * FROM ${table};`;

    this.runQuery(callback, queryString);
  },
  insertOne: function (table, columns, values, callback) {
    let questionMarks = new Array(values.length).fill("?").toString();
    let queryString = `INSERT INTO ${table}(${columns.toString()}) VALUES (${questionMarks})`;

    this.runQuery(callback, queryString, values);
  },
  updateOne: function (table, objColumnValues, condition, callback) {
    let columnsWithQuestionMarks = Object.keys(objColumnValues).map((column) => {
      return `${column} = ?`;
    }).toString();
    let values = Object.values(objColumnValues);
    let queryString = `UPDATE ${table} SET ${columnsWithQuestionMarks} WHERE ${condition}`;
    console.log(queryString);

    this.runQuery(callback, queryString, values);
  },
  runQuery: function (callback, queryString, values = []) {
    connection.query(queryString, values, (err, result) => {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }
};

module.exports = orm;