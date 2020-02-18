//basic api functions
const { Client, RichEmbed } = require('discord.js');
const sql = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(n, client, msg, {config}) {
  var needrole = config.firerole;
  var staffrole = msg.guild.roles.find(r => r.name == config.staffrole);
  if (!staffrole) {
    msg.channel.send("Please speak with the server administrator about setting a staff role.");
    return;
  }
  if (needrole) {
    if (msg.member.highestRole.position < needrole.position) return;
  }
  var target = msg.mentions.members.first();
  var reason = msg.content.split("> ")[1]
  if (!reason) {
    reason="Unspecified."
  }
  if (!target) {
    msg.channel.send("Please ping the user you want to fire.");
    return;
  }
  if (target.id == client.user.id) {
    msg.channel.send("You cannot fire me. (-10 respect)");
    return;
  }
  if (target.user.bot) {
    msg.channel.send("You cannot fire bots.");
    return;
  }
  if (target.highestRole.position > msg.author.highestRole) {
    msg.channel.send(`${target.username} is a higher role than you.`);
    return;
  }
  if (msg.guild.owner.id == target.id) {
    msg.channel.send(`I will not fire the owner!`);
    return;
  }
  if (target.highestRole.position > msg.guild.me.highestRole.position) {
    msg.channel.send(`My role is not high enough to modify ${target.displayName}'s roles. Please drag my role to the top of the role list!`);
    return;
  }
  target.send(`You have been demoted on ${msg.guild.name} for ${reason} by ${msg.author.username}`);
  msg.channel.send(`${msg.member.displayName} has demoted ${target.displayName} for ${reason}.`);
  target.removeRole(staffrole);
};

exports.usage = "fire @idiot abuse"
exports.description = "Fire a staff member."
exports.aliases = ["demote"]