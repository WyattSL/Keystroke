//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

exports.run = function(_n, _c, msg) {
    var target = msg.mentions.users.first();
    var silent = msg.content.includes(`-s`);
    var num = msg.content.split("-num ").split(" ")[0];
    if (!num) num = 999;
    var channel = msg.mentions.channels.first();
    if (!channel) channel = msg.channel;
    if (!num) num = 1000;
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
};