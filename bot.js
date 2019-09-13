const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js')

client.on('ready', () => {
  console.log('ready')
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
    msg.guild.createChannel("ticket-" + msg.author.username, { type: "text", topic: msg.author.username, nsfw: false});
    
    
  }
});