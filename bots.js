// This file is now the "bots"
// It is simple code that makes a new bot for every JSON file
// therefore removing the need to require them and simply the need to start this file.

// libaries
const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const global = require('global.js');
const mysql = require('mysql.js');
const perms = require('perms.js');
const fs = require('fs');

// configuraation
var bot_dir = "./bots/";


// Code

fs.readdir(bot_dir, function(err, files) {
  
});