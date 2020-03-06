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
        var video = results[0];
        var e = new RichEmbed;
        e.setTitle(video.title)
        e.setDescription(video.description)
        e.setUrl(video.link)
        e.setFooter(`Uploaded ${video.uploaded_at}`});
        e.setThumbnail(video.thumbnail);
        e.setAuthor(e.author.name, client.user.avatarURL, e.author.ref);
        msg.channel.send(e);
        msg.member.voiceChannel.join().then(connection => {
            var stream = ytdl(video.link, {quality: 'highestaudio'})
            connection
        });
      }
    });
  }
};

exports.usage = "play (id/search query: youtube)";
exports.description = "Play a youtube video.";
