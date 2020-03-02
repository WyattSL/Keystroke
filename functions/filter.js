const Discord = require('discord.js');
const {Client, RichEmbed} = require('discord.js');
const fs = require("fs");
const request = require("request");
const global = require("../global.js");

exports.run = function(client, config) {
    if (config.filter == "true" || config.filter == true) {
        client.on("message", (msg) => {
            var words = require("./words.json")
            var i;
            for (i=0;i<words.length;i++) {
                if (msg.content.contains(words[i])) {
                    try {
                        msg.delete();
                        msg.author.send(`Your message \`\`${msg.content}\`\` is not allowed.`);
                    } catch(err) {
                        console.warn(err);
                    }
                }
            }
        });
    }
};