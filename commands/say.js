//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(n, c, msg) {
  if (!perms.checkPerms)
  var tosay = msg.content.slice(5, msg.content.length);
  msg.delete();
  msg.channel.send(tosay);
};
