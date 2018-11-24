const orm = require("../config/orm");
const TABLE = "burgers";

const burger = {
  all: (callback) => {
    orm.selectAll(TABLE, callback);
  },
  insert: (columns, values, callback) => {
    orm.insertOne(TABLE, columns, values, callback);
  },
  update: (objColumnValues, condition, callback) => {
    orm.updateOne(TABLE, objColumnValues, condition, callback);
  }
};

module.exports = burger;