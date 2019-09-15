const { Client, RichEmbed } = require('discord.js');

exports.ready = function(b, c) {
  if (!b || !c) return false;
  const d = require(`./${b}.json`);
  var s = d.status;
  var m = d.mode;
  var g = d.game;
  c.user.setPresence({ game: { name: g, type: s }, status: m });
  if (c.guilds.array().length < 1) {
    console.log(`Keystroke Bot Ready | Logged in as ${c.user.username}#${c.user.discriminator} with no servers.`);
  } else {
    console.log(`Keystroke Bot Ready | Logged in as ${c.user.username}#${c.user.discriminator} with ${c.guilds.array().length} the first one being ${c.guilds.first().name}`);
  };
  return true;
};

exports.help = function(b) {
  const d = require(`./${b}.json`);
  if (!b) return false;
  var e = new RichEmbed().setColor(0x000000)
  .setFooter(`Job Request by ${d.owner}`)
  .set
}