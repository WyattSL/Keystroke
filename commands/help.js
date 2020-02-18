//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(n, c, msg) {
  if (msg.content.split(" ")[1]) {
    var cmd = msg.content.split(" ")[1];
    global.helpcmd(n, c, msg, cmd);
  } else {
    try {
      msg.channel.send(global.help(n, c, msg))
    } catch(err) {
      msg.channel.send(`stack trace error @ help.js whilst sending global help message`)
    }
  }
}

exports.usage = "help"
exports.description = "View this help page."
exports.hide = true;