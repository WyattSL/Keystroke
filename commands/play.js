const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const {Client, RichEmbed} = require('discord.js');

exports.run = function(name, client, msg) {
  var args = msg.content.split(" ");
  args.shift();
  var q = args.join(" ");
  if (client.playingMusic == {} || client.playingMusic || client.mpbusy) {
    msg.channel.send(":x: I am busy playing music in another channel, sorry.");
    return false;
  } else if (!msg.member.voiceChannel) {
    msg.channel.send(":x: You are not in a music channel!");
    return false;
  } else {
    ytsr(q, {limit: 1}, function(err, results) {
      if (err) {
        msg.channel.send("An error has occured. Please notify me (WyatL#347) with info YTSR:RESULTERROR:" + err);
        console.error(err);
        return false;
      } else if (!results) {
        msg.channel.send(":x: I did not find anything under that query.");
        return true;
      } else {
        console.log(err);
        console.log(results);
        console.log(results.items[0])
        var video = results.items[0];
        console.log(video.author);
        var e = new RichEmbed;
        e.setTitle(video.title)
        e.setDescription(video.description)
        e.setURL(video.link)
        e.setFooter(`Uploaded ${video.uploaded_at}`);
        e.setThumbnail(video.thumbnail);
        e.setAuthor(video.author.name, client.user.avatarURL, video.author.ref);
        msg.channel.send(e);
        var s = ytdl(video.link);
        if (!s) {
          msg.channel.send("CRIT: Request stream of " + video.link + " : stream not created");
          return false;
        } else {            
          msg.member.voiceChannel.join().then(con => {
            var dispatch = con.playStream(s);
            client.mpbusy = true;
            var data = {}
            client.md = dispatch;
                          data["video"] = video;
              data.video["query"] = q;
              data["requester"] = msg.member;
              data["dispatch"] = dispatch;
              data["connection"] = con;
              client["playingMusic"] = data;
            con.on('disconnect', () => {
              client.md = false;
              client.playingMusic = false;
              msg.channel.send(":x: Disconnected!");
              client.mpbusy = false;
            });
            dispatch.on('end', () => {
              var data = {};
              client.playingMusic = data;
              con.disconnect();
            });
            dispatch.on('error', (err) => {
              msg.channel.send('Critical Error! ' + err);
              con.disconnect();
            });
            client.musicPause = function() {
              var data = client.musicPlaying;
              data["paused"] = true;
              client.mpa = true;
              client.musicPlaying = data;
              dispatch.pause();
            }
            client.musicResume = function() {
              var data = client.musicPlaying;
              client.mpa = false;
              data["paused"] = false;
              dispatch.resume();
              client.musicPlaying = data;
            }
            client.musicEnd = function() {
              var data = client.musicPlaying;
              dispatch.end();
            }
          })
        }
      }
    });
  }
};

exports.usage = "play (id/search query: youtube)";