//basic api functions
const { Client, RichEmbed } = new RichEmbed;
const SQL = require('./mysql.js');
const perms = require('./perms.js');


exports.run = function(n, c, msg) {
  if (!perms.checkPerm(msg.member, "MANAGE_MESSAGES", msg.channel)) return;
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