//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');


exports.run = function(n, c, m) {
  if (!perms.checkPerm("KICK_MEMBERS", m.member, m.channel)) return;
  var tu = m.mentions.members.first();
  if (!tu) {
    var tm = m.content.slice(5, m.content.length);
    tu = m.guild.members.find(me => me.displayName === tm);
    if (tu) tu = tu.array();
    if (!tu) tu = m.guild.users.find(me => me.username === tm)
    if (tu) tu = tu.array();
  }
  var embed = new RichEmbed;
  embed.setTitle('Punishment');
  embed.setAuthor(m.member.displayName, m.author.avatarURL);
  embed.setDescription('Kicking ' + tu);
  if (!tu) {
    embed.setDescription(`Please mention an user, or type their nickname/displayname`);
  } else if (tu.length > 1) {
    embed.setDescription(`I found multiple people under that name. Please be more specfic, or mention the user.`);
  }
  embed.setFooter(process.env.FOOTER);
  embed.setColor(0xFF0000);
  m.channel.send(embed);
  if (tu && tu.length === 1) tu.kick();
  return true;
};

exports.usage = "kick @OWNER stupidity"
exports.description = "Remove a user from the guild."
exports.permission = "KICK_MEMBERS"