//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');


exports.run = function(n, c, msg) {
  msg.delete();
    var tr = msg.guild.roles.find(r => r.name === "TicketRole");
    if (!tr) {
      msg.guild.createRole({ name: "TicketRole" }, "Ticket Bot Setup");
      msg.guild.owner.send('I have automatically created a role named "TicketRole". This role should be given to staff members to view tickets.');
      var tr = msg.guild.roles.find(r => r.name === "TicketRole");
    }
    var tc = msg.guild.channels.find(ch => ch.name === "tickets" && ch.type === "category");
    if (!tc) {
      msg.guild.createChannel("tickets", {type: "category"});
      msg.guild.owner.send('I have automatically created a category channel named "Tickets". This channel is where all tickets will be stored.');
      var tc = msg.guild.channels.find(ch => ch.name === "tickets" && ch.type === "category");
    }
    msg.guild.createChannel("ticket-" + msg.author.username, { type: "text", parent: tc, topic: msg.author.username, nsfw: false, permissionOverwrites: [{
    id: msg.author.id,
    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
  }]
  msg.author.send("Your ticket has been created. You can view it in the TICKETS category.");
  return true;
};