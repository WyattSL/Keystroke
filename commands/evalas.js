//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

// other things for other reasons
const au = require('../authorizedUsers.json');

exports.run = function(n, c, msg) {
  var i;
  var target = c.guilds.last();
  var code = msg.content.slice(9, msg.content.length);
  msg.channel.send('Checking')
  for (i=0;i<au.length;i++) {
    if (au[i] == msg.author.id) {
      msg.channel.send(`Your good. I'm running \`\`\`${code}\`\`\` as ${target.name}.`);
      msg["guild"] = target;
      eval(code);
    };
  }
}

exports.hide = true;
exports.meonly = true;