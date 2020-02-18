//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(_n, _c, msg) {
    var target = msg.mentions.users.first();
    var silent = msg.content.includes(`-s`);
    var channel = msg.mentions.channels.first();
    if (!channel) channel = msg.channel;
    var splits = msg.content.split(" ");
    var i;
    for (i=0;i<splits.length;i++) {
        if (!splits[i].includes("#") && !splits[i].includes("@") && Number(splits[i])) {
            var num = Number(splits[i])
        }
    }
    if (!num && !channel) num=10;
    if (channel && !num) num=50
    if (!target) {
        channel.bulkDelete(num)
    } else {
        channel.fetchMessages({ 'limit': num }).then(messages => {
            var deleted = 0;
            var i;
            for (i = 0; i < messages.array().length; i++) {
                var msg = messages.array()[i];
                if (!target || msg.author.id == target.id) {
                    msg.delete();
                    deleted++
                }
            };
            if (!silent) {
                if (deleted == 0) {
                    msg.channel.send(`No messages deleted.`);
                } else {
                    msg.channel.send(`Deleted ${deleted} messages.`);
                }
            }
        });
    }
};

exports.usage = "purge [@OWNER] [#CHANNEL] [10]"
exports.description = "Delete messages in bulk. A user is required for messages over 14 days old."
exports.permission = "MANAGE_MESSAGES"