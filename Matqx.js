const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const SQL = require('./mysql.js');
const global = require('./global.js')

client.on('ready', () => {
  if (client.guilds.array().length < 1) {
    console.log(`Keystroke Bot Ready | Logged in as ${client.user.username}#${client.user.discriminator} with no servers.`);
  } else {
    console.log(`Keystroke Bot Ready | Logged in as ${client.user.username}#${client.user.discriminator} with ${client.guilds.array().length} the first one being ${client.guilds.first().name}`)
  }
});

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

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith('?close')) {
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
      msg.guild.createChannel("tickets", "category", [{ allow: ["VIEW_CHANNEL", "SEND_MESSAGES"], id: `${tr.id}` }]);
      msg.guild.owner.send('I have automatically created a category channel named "Tickets". This channel is where all tickets will be stored.');
      var tc = msg.guilds.channels.find(ch => ch.name === "tickets" && ch.type === "category");
    }
    msg.guild.createChannel("ticket-" + msg.author.username, "text", [{ allow: ["VIEW_CHANNEL", "SEND_MESSAGES"], id: `${msg.author.id}`}]);
    msg.author.send("Your ticket has been created. You can view it in the TICKETS category.");
  } else if (msg.content.startsWith("?announce")) {
    var tosay = msg.content.slice(10, msg.content.length);
    msg.delete();
    var ch = msg.channels.find(ch => ch.name === "announcements");
    if (!ch) {
      msg.guild.createChannel("announcements", { type: "text", topic: "News Updates!", nsfw: false });
      msg.guild.owner.send('I have automatically created a text channel named "Announcements". Announcements will be sent there.');
      var ch = msg.channels.find(ch => ch.name === "announcements");
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
    var tu = msg.mentions.users.first();
    var embed = new RichEmbed;
    embed.setTitle('Punishment');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription('Kicking ' + tu) // xd
    embed.setFooter(process.env.FOOTER);
    embed.setColor(0xFF0000);
    msg.channel.send(embed);
    tu.kick();
  } else if (msg.content.startsWith("?ban")) {
    if (!checkPerm(msg.member, "BAN_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.users.first();
    var embed = new RichEmbed;
    embed.setTitle('Punishment');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription('Banning ' + tu) // xd
    embed.setFooter(process.env.FOOTER);
    embed.setColor(0xFF0000);
    msg.channel.send(embed);
    tu.ban();
  } else if (msg.content.startsWith("?warn")) {
    if (!checkPerm(msg.member, "KICK_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.users.first();
    var ti = tu.id;
    var reason = msg.content.slice(6, msg.content.length);
    var gi = msg.guild.id;
    var ii = msg.author.id;
    var d = new Date();
    var ts = d.now();
    SQL.insert("warns", `${gi}^${ti}^${reason}^{ii}^{ts}`);
    var e = new RichEmbed()
    .setTitle(`Punishment`)
    .setColor(0xFF0000)
    .setAuthor(msg.member.displayName, msg.author.avatarURL)
    .setFooter(process.env.FOOTER)
    .setDescription(`<${ti}> has been warned for ${reason}!`);
    msg.channel.send(e);
  } else if (msg.content.startsWith("?mute")) {
    if (!checkPerm(msg.member, "MUTE_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.users.first();
    var ti = tu.id;
    var ii = msg.author.id;
    var tr = msg.guild.roles.find(r => r.name === "Muted");
    if (!tr) {
      msg.guild.createRole({ name: "Muted", hoist: false, mentionable: false, permissions: 68224000 }, "Mute Setup");
      msg.guild.owner.send('I have automatically created a role named "Muted". Muted players will have this role. It currently has basic permissions, you should verify these.');
      var tr = msg.guilds.roles.find(r => r.name === "Muted");
    };
    tu.addRole(tr, "Muted by " + msg.member.displayName);
    var e = new RichEmbed()
    .setTitle(`Punishment`)
    .setColor(0xFF0000)
    .setAuthor(msg.member.displayName, msg.author.avatarURL)
    .setFooter(process.env.FOOTER)
    .setDescription(`<${ti}> has been muted!`);
    msg.channel.send(e);
  } else if (msg.content.startsWith("?mute")) {
    if (!checkPerm(msg.member, "MUTE_MEMBERS", msg.channel)) return;
    var tu = msg.mentions.users.first();
    var ti = tu.id;
    var ii = msg.author.id;
    var tr = msg.guild.roles.find(r => r.name === "Muted");
    if (!tr) {
      msg.guild.createRole({ name: "Muted", hoist: false, mentionable: false, permissions: 68224000 }, "Mute Setup");
      msg.guild.owner.send('I have automatically created a role named "Muted". Muted players will have this role. It currently has basic permissions, you should verify these.');
      var tr = msg.guilds.roles.find(r => r.name === "Muted");
    };
    tu.removeRole(tr, "Unmuted by " + msg.member.displayName);
    var e = new RichEmbed()
    .setTitle(`Punishment`)
    .setColor(0xFF0000)
    .setAuthor(msg.member.displayName, msg.author.avatarURL)
    .setFooter(process.env.FOOTER)
    .setDescription(`<${ti}> has been unmuted!`);
    msg.channel.send(e);
  };
});


client.login(process.env.matqx);