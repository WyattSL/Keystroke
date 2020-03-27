const db = require('../mysql.js').db;
const global = require("../global.js");

exports.disabled = false;

exports.run = function(client, config) {
  db.all(`SELECT * FROM customcommands WHERE bot="${client.user.id}"`, function(err, data) {
    if (err) throw err;
      client.on("message", (msg) => {
        if (data[0]) {
          var i;
          client.ignoreCmd = [];
          for (i=0;i<data.length;i++) {
            client.ignoreCmd[data[i].cmd] = true
            if (msg.content.startsWith(client.prefix + data[i].cmd)) {
              msg.delete();
              msg.channel.send(data[i].response)
            }
          }
        }
      });
  });
}