//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(n, c, msg) {
  msg.channel.send(global.help(n, c))
}