const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const SQL = require('./mysql.js');
const global = require('./global.js');

client.on('ready', () => {
  global.ready("ZontServer", client)
});

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith('?report')) {
    var ch = msg.guild.channels.find(ch => ch.name === 'reports');
    msg.delete();
    var user = msg.mentions.users.first();
    var reason = msg.content
    var embed = new RichEmbed;
    embed.setTitle('New Report');
    embed.setAuthor(msg.member.displayName, msg.user.avatarURL);
    embed.setDescription(reason);
    embed.setFooter(process.env.footer);
    ch.send(embed);
    msg.channel.send("Your report has been submitted.")
  } else if (msg.content.startsWith('?close')) {
    if (msg.channel.name.startsWith('ticket-')) {
      msg.channel.delete();
      msg.guild.members.find(m => m.username === msg.channel.topic).send("Your ticket has been closed by " + msg.member.displayName + ".")
    } else {
      msg.channel.send("This is not an ticket channel!")
    }
  } else if (msg.content.startsWith("?new")) {
    msg.delete();
    var tr = msg.guilds.roles.find(r => r.name === "TicketRole");
    if (!tr) {
      msg.guild.createRole({ name: "TicketRole" }, "Ticket Bot Setup");
      msg.guild.owner.send('I have automatically created a role named "TicketRole". This role should be given to staff members to view tickets.');
      var tr = msg.guilds.roles.find(r => r.name === "TicketRole");
    }
    var tc = msg.guilds.channels.find(ch => ch.name === "tickets" && ch.type === "category");
    if (!tc) {
      msg.guild.createChannel("tickets", {type: "category"});
      msg.guild.owner.send('I have automatically created a category channel named "Tickets". This channel is where all tickets will be stored.');
      var tc = msg.guilds.channels.find(ch => ch.name === "tickets" && ch.type === "category");
    }
    msg.guild.createChannel("ticket-" + msg.author.username, { type: "text", topic: msg.author.username, nsfw: false});
    msg.author.send("Your ticket has been created. You can view it in the TICKETS category.");
  } else if (msg.content.startsWith("?say")) {
    var tosay = msg.content.slice(5, msg.content.length);
    msg.delete();
    msg.channel.send(tosay)
  } else if (msg.content.startsWith("?help")) { 
    msg.channel.send(global.help("Matqx", client))
  }
});


client.login(process.env.ZontServer);