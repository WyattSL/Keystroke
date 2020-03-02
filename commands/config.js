//basic api functions
const { Client, RichEmbed } = require('discord.js');
const sql = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

// features
const config = require("../functions/config.js");
const random = require("../functions/random.js")

// other shit
//var list = require("../configs.json");
// doesnt seem to work, using fs for a workaround
const fs = require('fs');

exports.run = function(id, client, msg) { // ?config autoRole Member
  var args = msg.content.split(" ");
  var value = args[2];
  var key = args[1];
  if (args[3]) {
    value = value + ' ' + args[3]
  }
  if (args[4]) {
    value = value + ' ' + args[4]
  }
  if (args[5]) {
    value = value + ' ' + refargs[5]
  }
  var embed = new RichEmbed;
  if (!value) {
    if (!key) {
      var list = fs.readFileSync("./configs.json");
      list = JSON.parse(list);
      var i;
      for (i=0;i<list.length;i++) {
        var l = list[i];
        var d = config.get(id, l);
        if (!d) {
          d = "Unset"
          if (l == "username") d = client.user.username;
          if (l == "avatar") d = client.user.avatarURL;
          if (l == "swearfilter") d = "false";
          if (l == "prefix") d = client.prefix;
          if (l == "game") d = client.game;
          if (l == "status") d = client.mode;
          if (l == "presence") d = client.presence;
          if (l == "staffrole") d = client.staffrole;
          if (l == "firerole") d = client.firerole;
        }
        embed.addField(l, d, false);
      }
      embed.setTitle("Configuration List");
      embed.setDescription("This can be a little complicated, please be careful!")
      if (random.chance(25)) {
        embed.setFooter("x_x this took so long");
      } else {
        embed.setFooter("-_-");
      }
    } else {
      value = config.get(id, key);
      embed.setTitle(key);
      embed.setDescription(value);
      if (random.chance(25)) {
        embed.setFooter("x_x this took so long");
      } else {
        embed.setFooter("-_-");
      }
    }
  } else {
    embed.setTitle(key);
    embed.addField("old", config.get(id, key));
    embed.addField("new", value);
    config.set(id, key, value);
    if (random.chance(25)) {
      embed.setFooter("x_x this took FOREVER");
    } else {
      embed.setFooter("-_-")
    }
  }
  msg.channel.send(embed);
};

exports.description = "Configure the robot."
exports.usage = "config prefix >"
exports.permission = "MANAGE_SERVER"