const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const customSQL = require('./mysql.js')

client.on('ready', () => {
  console.log('ready')
});

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
  } else if (msg.content.startsWith("?say")) {
    var tosay = msg.content.slice(5, msg.content.length);
    msg.delete();
    msg.channel.send(tosay)
  } else if (msg.content.startsWith("?announce")) {
    var tosay = msg.content.slice(10, msg.content.length);
    msg.delete();
    var ch = msg.channels.find(ch => ch.name === "announcements");
    if (!ch) {
      msg.guild.createChannel("announcements", { type: "text", topic: "News Updates!", nsfw: false });
      msg.guild.owner.send('I have automatically created a text channel named "Announcements". Announcements will be sent there.');
      var ch = msg.channels.find(ch => ch.name === "announcements");
    };
    var embed = new RichEmbed;
    embed.setTitle('Announcement');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription(tosay);
    embed.setFooter(process.env.FOOTER);
    embed.setColor(0x000000);
    ch.send(embed);
  } else if (msg.content.startsWith("?kick")) {
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
    var tu = msg.mentions.users.first();
    var embed = new RichEmbed;
    embed.setTitle('Punishment');
    embed.setAuthor(msg.member.displayName, msg.author.avatarURL);
    embed.setDescription('Banning ' + tu) // xd
    embed.setFooter(process.env.FOOTER);
    embed.setColor(0xFF0000);
    msg.channel.send(embed);
    tu.ban();
  } else if (msg.content.startsWith("?warn"))
});

client.on('guildMemberAdd', (m) => {
  var tr = m.guild.roles.find(r => r.name === "<!> Player <!>");
  if (tr) {
    m.addRole(tr, "AutoRank");
  };
});


client.login(process.env.roadpvp);