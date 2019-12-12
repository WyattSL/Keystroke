const { Client, RichEmbed } = require('discord.js');
const gl = require('./global.json');
const cmdlist = require('./commands.json');

exports.ready = function(b, c) {
  if (!b || !c) return false;
  const d = require(`./bots/${b}`);
  if (!gl.disable) {
    var s = d.status;
    var m = d.mode;
    var g = d.game;
    c.user.setPresence({ game: { name: g, type: s }});
    c.user.setStatus(m);
    if (c.guilds.array().length < 1) {
      console.log(`Keystroke Bot Ready | Logged in as ${c.user.username}#${c.user.discriminator} with no servers.`);
    } else if (c.guilds.array().length == 1) {
      console.log(`Keystroke Bot Ready | Logged in as ${c.user.username}#${c.user.discriminator} with ${c.guilds.array().length} server named ${c.guilds.first().name}.`);
    } else {
      console.log(`Keystroke Bot Ready | Logged in as ${c.user.username}#${c.user.discriminator} with ${c.guilds.array().length} servers: ${c.guilds.array()}`);
    };
    return true;
  } else {
    c.user.setPresence({ game: { name: gl.disablemsg, type: "PLAYING" }});
    c.user.setStatus('dnd');
    console.warn(`[WARNING] Test Mode Active, Bot ${c.user.username} is no longer responding to commands.`)
  }
};

exports.error = function() {
  return gl.maintence;
}

exports.help = function(b, c) {
  const d = require(`./bots/${b}.json`);
  if (!b) return false;
  var uptime = c.uptime;
  var e = new RichEmbed().setColor(0x000000)
  e.setFooter(`Job Request by ${d.owner}`);
  e.setTitle('Help')
    e.setDescription(`Bot ID ${b} | Ping ${c.ping} | Bot Uptime ${uptime} | For assistance please contact WyattL#3477`);
    if (!b.special) {
        var commands = d.commands;
        var i;
        for (i = 0; i < commands.length; i++) {
            var cmd = commands[i];
            e.addField(`${cmd}`, `${cmdlist[cmd]}`, false);
        };

    } else {
        var cmd_dir = `./commands/`;
        fs.readdir(cmd_dir, function (err, files) {
            if (err) throw err;
            if (!files) {
                console.error('Invalid cmd directory. No files contained within directory.')
            } else {
                var i;
                for (i = 0; i < files.length; i++) {
                    e.addField(`${files[i].split('.')[0]}`, `${cmdlist[i]}`, false);
                };
            };
        });
    }
  return e;
}