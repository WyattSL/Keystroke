const Discord = require('discord.js');
const {Client, RichEmbed} = require('discord.js');
const fs = require("fs");
const request = require("request");
const global = require("../global.js");
const db = require("../mysql.js").db;

exports.run = function(client) {
    setTimeout(this.exeAfter, 5000, client)
}

this.exeAfter = function(client) {
    var config = require("./config.js");
    if (config.get(client.name, "swearfilter") == "true" || config.get(client.name, "invitefilter") == "true") {
        client.on("message", (msg) => {
          if (config.get(client.name, "swearfilter") == "true") {
            /*
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
              } */
              db.all(`SELECT * FROM filtered WHERE server="${msg.id}"`, function(err, data) {
                if (err) {
                  throw err;
                } else {
                  if (data && data[0]) {
                    for (i=0;i<data.length;i++) {
                      if (msg.content.includes(data[i])) {
                        msg.delete();
                        break;
                      }
                    }
                  }
                }
              });
            }
            if (config.get(client.name, "invitefilter") == true) {
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
            }
        });
    }
};