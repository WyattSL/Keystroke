//basic api functions
const { Client, RichEmbed } = new RichEmbed;
const SQL = require('./mysql.js');
const perms = require('./perms.js');


exports.run = function(n, c, msg) {
  if (!perms.checkPerm(msg.member, "KICK_MEMBERS", msg.channel)) return;
};