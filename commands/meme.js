//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');
const got = require("got");
const random = require("../functions/random.js")

var URL = "https://meme-api.herokuapp.com/gimme";

exports.run = async function(name, client, msg) {
  if (!URL) {
      msg.channel.send("No meme endpoint URL.");
      return;
  }
  var rdata = await got.get(URL);
  var body = rdata.body;
  var data = JSON.parse(body);
  //var r = random.rmax(data.length);
  //console.log(r);
  //var turl = data[r].url
  var turl = data.url;
  msg.channel.send({ files: [
      turl
  ]});
};

exports.usage = "meme";
exports.description = "Fetch a random meme.";