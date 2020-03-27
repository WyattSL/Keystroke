//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

/*
exports.run = function(n, c, msg) {
  if (!perms.checkPerm("MANAGE_MESSAGES", msg.member, msg.channel)) return;
  var announcement = msg.content.slice(10, msg.content.length);
  var e = new RichEmbed()
  .setTitle(`Announcement`)
  .setColor(0xFF0000)
  .setAuthor(msg.member.displayName, msg.author.avatarURL)
  .setFooter(process.env.FOOTER)
  .setDescription(announcement);
  msg.channel.send(e);
  return true;
}; */

exports.run = function(name, client, msg) {
  var announcement = msg.content.slice(10, msg.content.length);
  var channel = msg.guild.channels.find(ch => ch.name.includes("announce"))
  var name = msg.guild.name;
  var av = msg.guild.iconURL;
  var reason = `Announcement`;
  channel.createWebhook(name, av, reason).then(webhook => {
    webhook.send(announcement).then(ms => {
      webhook.delete();
    });
  });
}

exports.description = "Send a announcement to whatever channel has 'announce' in it's name. Will be sent as the server name."
exports.usage = "announce This is important!"
exports.permission = "MANAGE_MESSAGES"
exports.meonly = false;
exports.hide = false;