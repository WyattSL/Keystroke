const Discord = require('discord.js');
const {Client, RichEmbed} = require('discord.js');
const fs = require("fs");
const request = require("request");
const global = require("../global.js");

exports.run = function(config, client) {
  // silence you piece of crap
  // actually lets do something
  this.sendChat = function(player, message) {
    var channel = config.chatchannel;
    var embed = new RichEmbed;
    embed.setAuthor(player);
    embed.setDescription(message);
    embed.setFooter('chat intergration server courtsey of wyattl');
    embed.setTimestamp();
  }
}

exports.web = function(req, res) {
  var bot = req.query.bot; // this isn't secure at all and could cause some problems, lets hope its not abused!!!!!
  var method = req.query.method;
  if (method == "chat") {
    var player = req.query.player;
    var message = req.query.message;
    if (!player || !message) {
      res.end("invalid_args_for_method");
      return;
    }
    res.end("sent")
    this.sendChat(player, message);
  } else {
    res.end("invalid_method");
    return;
  }
}

exports.webreserve = "int"