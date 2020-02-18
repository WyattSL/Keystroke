const Discord = require('discord.js');
const {Client, RichEmbed} = require('discord.js');
const fs = require("fs");
const request = require("request");
const global = require("../global.js");

exports.run = function(client, config) {
    if (client.user.username == "KeyTest") {
        client.on("message", (msg) => {
            if (msg.content.startsWith("?delbot")) {
                if (msg.member.hasPermission(8)) {
                    var args = msg.content.split(" ");
                    msg.content.send("Bot " + args[1] + " is being deleted...");
                    var path = `./bots/${args[1]}.json`;
                    var c = global.clientList[args[1]];
                    var id = c.id;
                    fs.unlinkSync(c);
                    msg.channel.send("deleted " + path);
                    msg.channel.send("deleting app");
                    request({method: "DELETE", uri: "https://"})
                } else {
                    msg.channel.send(":x: Permission denied.")
                }
            }
        });
    }
}