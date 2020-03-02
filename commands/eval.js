//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

// other things for other reasons
const au = require('../authorizedUsers.json');

exports.run = function(n, c, msg) {
  var i;
  var code = msg.content.slice(6, msg.content.length);
  msg.channel.send('Okay, let\'s see here. ' + code + ' right?')
  msg.channel.send(`Okay!`);
  try {
    eval(code)
  } catch(err) {
    msg.channel.send(err)
  }
};

exports.hide = false;
exports.meonly = true;
exports.permission = "ADMINISTRATOR"
exports.description = "Raw code execution."
exports.usage = "eval console.log('hi');"