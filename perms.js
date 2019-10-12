const { Client, RichEmbed } = require('discord.js');
const sql = require('./mysql.js');
//const pl = require('./permissions.json');

exports.noPerm = function(ch) {
  var e = new RichEmbed()
  .setTitle(`Error`)
  .setColor(0xFF0000)
  .setFooter(process.env.FOOTER)
  .setDescription(`You are lacking permission to perform this action!`);
  ch.send(e);
}

exports.checkPerm = function(p, m, c) {
  if (!m || !p) return false;
  if (m.hasPermission(p, false, true, true)) {
    return true;
  } else {
    this.noPerm(c);
    return false;
  }
};