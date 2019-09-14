const fs = require('fs');
const dbFile = './.data/sqlite.db';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);

db.serialize();



exports.code = function (code) {
  console.log('running ' + code + ' !');
  db.run(code);
  console.log('executed');
};

exports.get = function(table, query) {
  db.all(`SELECT * FROM ${table} WHERE ${query}`, function(err, rows) {
    if (err) throw err;
    if (rows) {
      return(JSON.stringify(rows));
    }
  });
};