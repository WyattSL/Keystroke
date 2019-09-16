const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const SQL = require('./mysql.js');
const global = require('./global.js');

// Configuration
var name = __filename.split(".")[0].split("/")[2];


function noPerm(ch) {
  var e = new RichEmbed()
  .setTitle(`Error`)
  .setColor(0xFF0000)
  .setFooter(process.env.FOOTER)
  .setDescription(`You are lacking permission to perform this action!`);
  ch.send(e);
};

function checkPerm(m, p, ch) {
  if (!m || !p) return false;
  if (m.hasPermission(p, false, true, true)) {
    return true;
  } else {
    noPerm(ch);
    return false;
  }
};


client.on('ready', () => {
  global.ready(name, client)
});

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith('?report')) {
    var ch = msg.guild.channels.find(ch => ch.name === 'reports');
    if (!ch) {
      msg.guild.createChannel("reports", {type: "text"});
      msg.guild.owner.send('I have automatically created a text channel named "Reports". This channel is where all reports will be stored. This channel currently has no permissions. Please configure them.');
      var ch = msg.guild.channels.find(ch => ch.name === "reports" && ch.type === "text");
    }
    msg.delete();
    var user = msg.mentions.users.first();
    var reason = msg.content
    var embed = new RichEmbed;
    embed.setTitle('New Report');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(reason);
    embed.setFooter(process.env.footer);
    ch.send(embed);
    msg.channel.send("Your report has been submitted.")
  } else if (msg.content.startsWith('?close')) {
    if (msg.channel.name.startsWith('ticket-')) {
      msg.channel.delete();
      msg.guild.members.find(m => m.user.username === msg.channel.topic).send("Your ticket has been closed by " + msg.member.displayName + ".")
    } else {
      msg.channel.send("This is not an ticket channel!")
    }
  } else if (msg.content.startsWith("?new")) {
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
    msg.guild.createChannel("ticket-" + msg.author.username, { type: "text", topic: msg.author.username, nsfw: false});
    msg.author.send("Your ticket has been created. You can view it in the TICKETS category.");
  } else if (msg.content.startsWith("?say")) {
    var tosay = msg.content.slice(5, msg.content.length);
    msg.delete();
    msg.channel.send(tosay)
  } else if (msg.content.startsWith("?help")) { 
    msg.channel.send(global.help("name", client))
  }else if (msg.content.startsWith("?announce")) {
    var tosay = msg.content.slice(10, msg.content.length);
    msg.delete();
    var ch = msg.guild.channels.find(ch => ch.name === "announcements");
    if (!ch) {
      msg.guild.createChannel("announcements", { type: "text", topic: "News Updates!", nsfw: false });
      msg.guild.owner.send('I have automatically created a text channel named "Announcements". Announcements will be sent there.');
      var ch = msg.guild.channels.find(ch => ch.name === "announcements");
    };
    if (!checkPerm(msg.member, "MANAGE_CHANNELS", msg.channel)) return;
    var embed = new RichEmbed;
    embed.setTitle('Announcement');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(tosay);
    embed.setFooter(process.env.FOOTER);
    embed.setColor(0x000000);
    ch.send(embed);
  } else if (msg.content.startsWith("?kick")) {
    if (!checkPerm(msg.member, "KICK_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.members.first();
    var embed = new RichEmbed;
    embed.setTitle('Punishment');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription('Kicking ' + tu)
    embed.setFooter(process.env.FOOTER);
    embed.setColor(0xFF0000);
    msg.channel.send(embed);
    tu.kick();
  } else if (msg.content.startsWith("?ban")) {
    if (!checkPerm(msg.member, "BAN_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.members.first();
    var embed = new RichEmbed;
    embed.setTitle('Punishment');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription('Banning ' + tu)
    embed.setFooter(process.env.FOOTER);
    embed.setColor(0xFF0000);
    msg.channel.send(embed);
    tu.ban();
  } else if (msg.content.startsWith("?warn")) {
    if (!checkPerm(msg.member, "KICK_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.users.first();
    var ti = tu.id;
    var reason = msg.content.slice(28, msg.content.length);
    var gi = msg.guild.id;
    var ii = msg.author.id;
    var d = new Date();
    var ts = d.valueOf();
    SQL.insert("warns", `${gi}^${ti}^${reason}^${ii}^${ts}`);
    var e = new RichEmbed()
    .setTitle(`Punishment`)
    .setColor(0xFF0000)
    .setAuthor(msg.member.displayName, msg.author.avatarURL)
    .setFooter(process.env.FOOTER)
    .setDescription(`<@${ti}> has been warned for ${reason}!`);
    msg.channel.send(e);
  } else if (msg.content.startsWith("?mute")) {
    if (!checkPerm(msg.member, "MUTE_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.members.first();
    var ti = tu.id;
    var ii = msg.author.id;
    var tr = msg.guild.roles.find(r => r.name === "Muted");
    if (!tr) {
      msg.guild.createRole({ name: "Muted", hoist: false, mentionable: false, permissions: 68224000 }, "Mute Setup");
      msg.guild.owner.send('I have automatically created a role named "Muted". Muted players will have this role. It currently has basic permissions, you should verify these.');
      var tr = msg.guild.roles.find(r => r.name === "Muted");
    };
    tu.addRole(tr, "Muted by " + msg.member.displayName).catch();
    var e = new RichEmbed()
    .setTitle(`Punishment`)
    .setColor(0xFF0000)
    .setAuthor(msg.member.displayName, msg.author.avatarURL)
    .setFooter(process.env.FOOTER)
    .setDescription(`<@${ti}> has been muted!`);
    msg.channel.send(e);
  } else if (msg.content.startsWith("?unmute")) {
    if (!checkPerm(msg.member, "MUTE_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.members.first();
    var ti = tu.id;
    var ii = msg.author.id;
    var tr = msg.guild.roles.find(r => r.name === "Muted");
    if (!tr) {
      msg.guild.createRole({ name: "Muted", hoist: false, mentionable: false, permissions: 68224000 }, "Mute Setup");
      msg.guild.owner.send('I have automatically created a role named "Muted". Muted players will have this role. It currently has basic permissions, you should verify these.');
      var tr = msg.guilds.roles.find(r => r.name === "Muted");
    };
    tu.removeRole(tr, "Unmuted by " + msg.member.displayName).catch();
    var e = new RichEmbed()
    .setTitle(`Punishment`)
    .setColor(0xFF0000)
    .setAuthor(msg.member.displayName, msg.author.avatarURL)
    .setFooter(process.env.FOOTER)
    .setDescription(`<@${ti}> has been unmuted!`);
    msg.channel.send(e);
  }
});


client.login(process.env[name]);