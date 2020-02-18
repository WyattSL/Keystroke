//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

// warns ("server" LONGINT, "user" LONGINT, "reason" LONGTEXT, "by" LONGTEXT, "time" LONGINT)

exports.run = function(n, c, msg) {
  if (!perms.checkPerm("KICK_MEMBERS", msg.member, msg.channel)) return;
  var ti;
  if (msg.mentions.users.first()) {
    var tu = msg.mentions.users.first();
    var ti = tu.id;
  }
  var reason = msg.content.slice(28, msg.content.length);
  var gi = msg.guild.id;
  var ii = msg.author.id;
  var d = new Date();
  var ts = d.valueOf();
  //SQL.insert("warns", `${gi}^${ti}^${reason}^${ii}^${ts}`);
  SQL["db"].all(`SELECT * FROM warns WHERE server='${msg.guild.id}'`, function(err, rows) {
    if (err) throw err;
    if (!rows) {
        msg.channel.send("Failed to find any warnings for this server.")
    } else {
        var embed = new RichEmbed;
        var i;
        for (i=0;i<rows.length;i++) {
            var row = rows[i];
            if (!ti) {
                embed.addField(`Staff: ${rows["by"]}`, `Reason: ${rows["reason"]}`, true)
            } else if (ti == rows["user"]) {
                embed.addField(`Staff: ${rows["by"]}`, `Reason: ${rows["reason"]}`, true)
            }
        }
        embed.setColor(0xFF0000)
        msg.channel.send(embed);
    }
  });
  return true;
};