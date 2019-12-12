const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const Webhook = new Discord.WebhookClient(process.env.ErrorID, process.env.ErrorToken);

exports.run = function (client, config) {
    client.on('warn', (info) => {
        if (info) {
            var embed = new RichEmbed;
            embed.setColor(0x00ff00);
            embed.setUser(client.user, client.user.avatarURL);
            embed.setTitle(`Warning`);
            embed.setDescription(info);
            embed.setTimestamp();
            Webhook.sendMessage(embed);
        } else {
            Webhook.sendMessage(`I figured it would be nice to inform you that ${client.user.username} recently encountered a Warning without any information.`);
        }
    });
    client.on('error', (info) => {
        if (info) {
            var embed = new RichEmbed;
            embed.setColor(0xff0000);
            embed.setUser(client.user, client.user.avatarURL);
            embed.setTitle(`Terrible Error`);
            embed.setDescription(info);
            embed.setTimestamp();
            Webhook.sendMessage(embed);
        } else {
            Webhook.sendMessage(`I figured it would be nice to inform you that ${client.user.username} recently encountered a Terrible Error without any information.`);
        }
    });
};