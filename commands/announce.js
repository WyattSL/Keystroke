//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');


exports.run = function(n, c, msg) {
  if (!perms.checkPerm("MANAGE_MESSAGES", msg.member, msg.channel)) return;
  var announcement = msg.content.slice(10, msg.content.length);
  var e = new RichEmbed()
  .setTitle(`Announcement`)
  .setColor(0xFF0000)
  .setAuthor(msg.member.displayName, msg.author.avatarURL)
  .setFooter(process.env.FOOTER)
  .setDescription(announcement);
  msg.channel.send(e);
  return true;
};

exports.description = "Send a announcement in the current channel."
exports.usage = "announce This is important!"
exports.permission = "MANAGE_MESSAGES"
exports.meonly = false;
exports.hide = false;