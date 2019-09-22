//basic api functions
const { Client, RichEmbed } = new RichEmbed;
const SQL = require('./mysql.js');
const perms = require('./perms.js');


exports.run = function(n, c, msg) {
  if (msg.channel.name.startsWith('ticket-')) {
    msg.channel.delete();
    msg.guild.members.find(m => m.user.username === msg.channel.topic).send("Your ticket has been closed by " + msg.member.displayName + ".")
  } else {
    msg.channel.send("This is not an ticket channel!")
  }
};