//basic api functions
const { Client, RichEmbed } = new RichEmbed;
const sql = require('./mysql.js');
const perms = require('./perms.js');


exports.run = function(n, c, m) {
  if (!perms.checkPerm(m.member, "BAN_MEMBERS", m.channel)) return;
  var tu = m.mentions.members.first();
  if (!tu) {
    var tm = m.content.slice(5, m.content.length);
    tu = m.guild.members.find(me => me.displayName === tm).array();
    if (!tu) tu = m.guild.users.find(me => me.username === tm).array();
  }
  var embed = new RichEmbed;
  embed.setTitle('Punishment');
  embed.setAuthor(m.member.displayName, m.author.avatarURL);
  embed.setDescription('Banning ' + tu);
  if (!tu) {
    embed.setDescription(`Please mention an user, or type their nickname/displayname`)
  } else if (tu.length > 1) {
    embed.setDescription(`It appears`)
  }
  embed.setFooter(process.env.FOOTER);
  embed.setColor(0xFF0000);
  m.channel.send(embed);
  tu.ban();
  return true;
};