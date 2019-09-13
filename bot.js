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
    var user = msg.mentions.users.first();
    var reason = msg.content
    var embed = new RichEmbed;
    embed.setTitle('New Report');
    embed.setAuthor(msg.member.displayName, msg.user.avatarURL);
    embed.setDescription(reason);
    embed.setFooter(process.env.footer);
    ch.send(embed);
  } else if (msg.content.startsWith('?close')) {
    if (msg.channel.name.startsWith('ticket-')) {
      msg.channel.delete();
    }
  }
});