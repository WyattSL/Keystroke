const ytdl = require('ytdl');
const ytsr = require('ytsr');
const {Client, RichEmbed} = require('discord.js');

exports.run = function(name, client, msg) {
  var args = msg.content.split(" ").shift();
  var q = args.join(" ");
  if (client.playingMusic) {
    msg.channel.send(":x: I am busy playing music in another channel, sorry.");
    return false;
  } elseif (!msg.member.voiceChannel) {
    msg.channel.send(":x: You are not in a music channel!");
    return false;
  } else {
    ytsr.searchResults(q, {limit: 1}, function(err, results) {
      if (err) {
        msg.channel.send("An error has occured. Please notify me (WyatL#347) with info YTSR:RESULTERROR:" + err);
        console.error(err);
        return false;
      } elseif (!results) {
        msg.channel.send(":x: I did not find anything under that query.");
        return true;
      } else {
        var e = new RichEmbed;
        e
      }
    });
  }
};

exports.usage = "play (id/search query: youtube)";
exports.description = "Play a youtube video. Must be categorized as 'music'.";
