//basic api functions
const { Client, RichEmbed } = new RichEmbed;
const sql = require('./mysql.js');
const perms = require('./perms.js');


exports.run = function(n, c, m) {
  if (!perms.checkPerm(m.member, "BAN_MEMBERS", m.channel)) return;
  var tu = m.mentions.members.first();
  var embed = new RichEmbed;
  embed.setTitle('Punishment');
  embed.setAuthor(m.member.displayName, m.author.avatarURL);
  embed.setDescription('Banning ' + tu)
  embed.setFooter(process.env.FOOTER);
  embed.setColor(0xFF0000);
  m.channel.send(embed);
  tu.ban();
  return true;
};