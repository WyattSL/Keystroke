//basic api functions
const { Client, RichEmbed } = require('discord.js');
const SQL = require('../mysql.js');
const perms = require('../perms.js');
const global = require('../global.js');

// other things for other reasons
const au = require('../authorizedUsers.json');

exports.run = function(n, c, msg) {
  var i;
  for (i=0;i<au.length;i++) {
    if (au[i] === msg.author.id) {
      msg.channel.send('Okay!');
      msg.delete();
      eval(msg.contents.split('-')[1]);
    }
  }
};