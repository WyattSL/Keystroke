//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');


exports.run = function(n, c, m) {
    var msg=m;
  var r = msg.content.slice(msg.content.split(" ")[0].length, msg.content.length)
  var embed = new RichEmbed;
  embed.setTitle("Suggestion");
  embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
  embed.setDescription(r);
  embed.setColor(0xFF0000);
  embed.setTimestamp();
  embed.setFooter("o_o");
  var channel = msg.guild.channels.find(ch => ch.name.includes("suggest"));
  if (!channel) {
      msg.channel.send("I failed to find a suggest channel. Please contact a administrator.");
  } else {
      channel.send(embed).then(cm => {
        cm.react("☑");
        cm.react("❌");
      });
      msg.channel.send("Your suggestion has been submitted.");
  }
  return true;
};

exports.description = "Suggest a feature."
exports.usage = "suggest #CHANNEL should be renamed to #awesome-CHANNEL!"