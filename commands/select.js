//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

// other things for other reasons
const au = require('../authorizedUsers.json');

exports.run = function(n, c, msg) {
  var i;
  var code = msg.content.slice(8, msg.content.length);
  msg.channel.send("\`\`\`sql\n" + code + "\`\`\`")
  try {
    SQL.db.select(code, function(err, results) {
      if (err) msg.channel.send("\`\`\`fix\n" + err + "\`\`\``");
      if (results[0]) msg.channel.send("\`\`\`json\n" + results + "\`\`\`");
    });
  } catch(err) {
    msg.channel.send(err)
  }
};

exports.hide = false;
exports.omeonly = true;
exports.permission = "ADMINISTRATOR"
exports.description = "Raw code execution."
exports.usage = "eval console.log('hi');"