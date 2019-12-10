//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(n, c, msg) {
  var target = msg.mentions.users.first();
  var silent = msg.content.includes(`-s`);
  var num = msg.content.split("-num ").split(" ")[0];
  var channel = msg.mentions.channels.first();
  if (!channel) channel = msg.channel;
  if (!num) num = 1000;
  if (!target) target
};