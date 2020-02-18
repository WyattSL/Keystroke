//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(n, c, msg) {
  if (!perms.checkPerm("KICK_MEMBERS", msg.member, msg.channel)) return;
  var tu = msg.mentions.users.first();
  var ti = tu.id;
  var reason = msg.content.slice(28, msg.content.length);
  var gi = msg.guild.id;
  var ii = msg.author.id;
  var d = new Date();
  var ts = d.valueOf();
  //SQL["db"].run("warns", `${gi}^${ti}^${reason}^${ii}^${ts}`);
  SQL["db"].run("INSERT INTO warns VALUES ('${gi}', '${ti}', '${reason}', '${ii}', '${ts}')")
  var e = new RichEmbed()
  .setTitle(`Punishment`)
  .setColor(0xFF0000)
  .setAuthor(msg.member.displayName, msg.author.avatarURL)
  .setFooter(process.env.FOOTER)
  .setDescription(`<@${ti}> has been warned for ${reason}!`);
  msg.channel.send(e);
  return true;
};