//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');


exports.run = function(n, c, m) {
    var msg=m;
  var tu = m.mentions.members.first();
  if (!tu) {
      msg.channel.send("Please ping the player you want to report, then specify the reason.");
      return false;
  }
  var reason = msg.content.slice(msg.content.indexOf(">"), msg.content.length);
  var embed = new RichEmbed;
  embed.setTitle("Report");
  embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
  embed.setDescription(`[${tu.username}}#${tu.discriminator}] was reported for ${reason}`);
  embed.setColor(0xFF0000);
  embed.setTimestamp();
  embed.setFooter("o_o");
  var channel = msg.guild.channels.find(ch => ch.name.includes("report"));
  if (!channel) {
      msg.channel.send("I failed to find a report channel. Please contact a administrator.");
  } else {
      channel.send(embed);
      msg.channel.send("Your report has been submitted.");
  }
  return true;
};

exports.description = "Report a user."
exports.usage = "report @OWNER stupidity"