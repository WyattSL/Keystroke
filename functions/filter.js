const Discord = require('discord.js');
const {Client, RichEmbed} = require('discord.js');
const fs = require("fs");
const request = require("request");
const global = require("../global.js");

exports.run = function(client) {
    setTimeout(this.exeAfter, 5000, client)
}

this.exeAfter = function(client) {
    var config = require("./config.js");
    if (config.get(client.name, "swearfilter") == "true" || config.get(client.name, "swearfilter") == true) {
        client.on("message", (msg) => {
            var words = require("../words.json")
            var i;
            for (i=0;i<words.length;i++) {
                if (msg.content.includes(words[i])) {
                    try {
                        msg.delete();
                        msg.author.send(`Your message \`\`${msg.content}\`\` is not allowed.`);
                    } catch(err) {
                        console.warn(err);
                    }
                }
            }
            var splits = msg.content.split(" ");
            var i;
            for (i=0;i<splits.length;i++) {
                var m = splits[i];
                if (m.includes("discord.gg/")) {
                    if (msg.member.hasPermission("MANAGE_MESSAGES") && false) return;
                    msg.delete();
                    msg.author.send(`Your message \`\`${msg.content}\`\` is not allowed.`);
                    return;
                }
            }
        });
    }
};