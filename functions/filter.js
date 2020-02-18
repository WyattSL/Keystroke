const Discord = require('discord.js');
const {Client, RichEmbed} = require('discord.js');
const fs = require("fs");
const request = require("request");
const global = require("../global.js");
try {
const config = require("../functions/config.js")
} catch(err) {
    // do nothin cause this probs aint done yet.
}

exports.run = function(client, config) {
    if (config.filter == "true" || config.filter == true) {
        client.on("message", (msg) => {
            var words = config.getList("filter")
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