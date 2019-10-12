// This file is now the "bots"
// It is simple code that makes a new bot for every JSON file
// therefore removing the need to require them and simply the need to start this file.

// libaries
const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const global = require('./global.js');
const mysql = require('./mysql.js');
const perms = require('./perms.js');
const fs = require('fs');
const bu = require('./blockedusers.json')

// configuraation
var bot_dir = "./bots/";


// Code

function createBot(id) {
  if (!id) return false;
  var bj = require(`./bots/${id}`);
  
  var client = new Discord.Client();
  client.login(process.env["TOK_" + id.split('.json')[0]]);
  client.on('ready', () => {
    global.ready(id, client);
  });
  client.on('message', (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(bj.prefix)) return;
  });
};

fs.readdir(bot_dir, function(err, files) {
  if (!files) {
    console.error('Invalid bot directory. No bots contained within directory.')
  } else {
    var i;
    for (i=0;i<files.length;i++) {
      createBot(files[i]);
    };
  };
});