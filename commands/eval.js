//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

// other things for other reasons
const au = require('../authorizedUsers.json');

exports.run = function(n, c, msg) {
  var i;
  var code = msg.content.slice(6, msg.content.length);
  msg.channel.send("\`\`\`js\n" + code + "\`\`\`")
  try {
    eval(code)
  } catch(err) {
    msg.channel.send(err)
  }
};

exports.hide = false;
exports.owneronly = true;
exports.permission = "ADMINISTRATOR"
exports.description = "Raw code execution."
exports.usage = "eval console.log('hi');"