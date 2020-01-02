const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');

function delwebhook(webhook) {
  webhook.delete();
  return true;
}

exports.run = function(client, config) {
  if (config.joinchannel) {
    client.on('guildMemberAdd', (member) => {
      var channel = client.channels.find(ch => ch.type == "text" && ch.id == config.joinchannel);
      console.log(channel);
      channel.createWebhook(`Notification`, member.user.avatarURL).then(webhook => {
        var options = {
          'username': member.user.username,
          'attachments': [{
            'pretext': `Present!`,
            'color': '#00FF00',
          }]
        }
        console.log(webhook);
        webhook.sendSlackMessage(options);
        setTimeout(delwebhook, 500, webhook);
      });
    });
  }
  if (config.leavechannel) {
    client.on('guildMemberRemove', (member) => {
      var channel = client.channels.find(ch => ch.type == "text" && ch.id == config.leavechannel);
      console.log(channel);
      channel.createWebhook(`Notification`, member.user.avatarURL).then(webhook => {
        console.log(webhook);
        var options = {
          'username': member.user.username,
          'attachments': [{
            'pretext': `Absent!`,
            'color': '#FF0000',
          }]
        }
        webhook.sendSlackMessage(options);
        setTimeout(delwebhook, 500, webhook)
      });
    });
  }
};