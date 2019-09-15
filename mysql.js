const fs = require('fs');
const dbFile = './.data/sqlite.db';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbFile);

db.serialize();

// TABLE LIST
// warns ("server" LONGINT, "user" LONGINT, "reason" LONGTEXT, "by" LONGTEXT, "time" LONGINT)



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

// Relative Data

// TABLE FORMAT: warns ("server" LONGINT, "user" LONGINT, "reason" LONGTEXT, "by" LONGTEXT, "time" LONGINT)
// VALUE OF "INSERT" IN CONSOLE.LOG: ("288100334084030465", "270035320894914560", "Test Reason", "270035320894914560", "1568590232875");
// VALUE OF DA IN CONSOLE.LOG: 288100334084030465,270035320894914560,Test Reason,270035320894914560,1568590232875
// LENGTH OF DA IN CONSOLE.LOG: 5

// VALUE OF TABLE ON RUN: warns
// VALUE OF DATA ON RUN: 288100334084030465^270035320894914560^Test Reason^270035320894914560^1568590371980

exports.insert = function(table, data) {
  if (!table || !data) return false;
  console.log(table + " " + data)
  var da = data.split("^");
  console.log(da + " " + da.length)
  var insert = `(`
  var i;
  for (i=0; i<da.length; i++) {
    var d = da[i];
    if (i+1 == da.length) {
      var insert = insert + `"${d}");`;
    } else {
      var insert = insert + `"${d}", `;
    };
  };
  if (!insert) return false;
  console.log(insert);
  db.run(`INSERT INTO ${table} VALUES ${insert}`);
  return true;
};

// SQL ERROR
/*
events.js:183
      throw er; // Unhandled 'error' event
      ^

Error: SQLITE_ERROR: near ";": syntax error
*/