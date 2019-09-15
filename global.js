const { Client, RichEmbed } = require('discord.js');
const gl = require('./global.json');

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

exports.error = function() {
  return gl.maintence;
}

exports.help = function(b, c) {
  const d = require(`./${b}.json`);
  if (!b) return false;
  var uptime = c.uptime;
  var mins = uptime/60000;
  var hours = uptime/3600000
  var format;
  if (mins < 1) {
    mins = uptime/1000;
    hours = 0;
    format = `${hours} Minutes & ${mins} Seconds`
  } else {
    var sub = hours*60;
    mins = mins-sub;
    format = `${hours} Hours & ${mins} Minutes`
  }
  var e = new RichEmbed().setColor(0x000000)
  .setFooter(`Job Request by ${d.owner}`)
  .setTitle('Help')
  .setDescription(`Bot ID ${b} | Bot Uptime ${format} | For assistance please contact WyattL#3477`)
  var commands = d.commands;
  var i;
  for (i=0;i<commands.length;i++) {
    var cmd = commands[i];
    if (!cmd) 
  }
}