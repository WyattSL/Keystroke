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
const config = require("./functions/config.js")

// configuraation
var bot_dir = "./bots/";

// Code

function createBot(id) {
  if (!id) return false; // ensure a JSON file is attached
  var bj = require(`./bots/${id}`); // require the JSON file
  
  var client = new Discord.Client(); // create a new client instance
  if (bj.disable) {
    console.log(`Keystroke ${id} Disabled.`);
    return;
  }
  client.login(process.env["TOK_" + id.split('.json')[0]]).catch(err => {
    console.warn("failed to login to " + id);
  }); // login to the bot
  client.on('ready', () => {
    fs.readdir('./functions/', function(err, files) {
      if (err) throw err;
      if (!files) console.warn("No functions found");
      if (files) {
        var i;
        for (i=0;i<files.length;i++) {
          try {
            var func = require("./functions/" + files[i]);
            if (!func.disabled) {
              func.run(client, id)
            }
          } catch(err) {
            console.warn(`Error loading function: ${files[i]} [${err}]`)
          }
        }
      }
    });
    global.ready(id, client); // do things when the bot is ready (different file)
  });
  client.on('message', (msg) => { // when a message is sent
    if (msg.author.bot) return; // ensure message was sent by a user
    var prefix = config.get(id.split(".json")[0], "prefix");
    if (client.ignoreCmd && client.ignoreCmd[msg.content.slice(1)]) return;
    if (!prefix) prefix = bj.prefix.toLowerCase(); // get the bot's prefix
    client.prefix = prefix;
    client.firerole = bj.firerole;
    client.staffrole = bj.staffrole;
    client.name = bj.id;
    client.id = bj.id;
    client.owner = bj.owner;
    client.commands = bj.commands;
    client.swearfilter = bj.swearfilter;
    client.mode = bj.mode;
    client.presence = bj.status;
    client.game = bj.game;
    if (!msg.content.startsWith(prefix) && !msg.content.startsWith("keystroke:")) return; // ensure the message starts with the prefix
    try {
      var cmd = require(`./commands/${msg.content.split(prefix)[1].split(' ')[0]}.js`); // load the command
    } catch(err) {
      if (err && !err.toString().includes("Error: Cannot find module")) {
        console.warn(err)
        msg.channel.send("WOW! You just encountered the rare error, when a command module exists but requiring it results in an error! Please tell me.")
      } else {
        if (prefix !== "?" && prefix !== "!" && prefix !== "-") {
          msg.channel.send("I couldn't find that command.")
        }
      }
    }
    if (!cmd) { return } else { // ensure the command exists
      var i;
      var allowcmd = false
      for (i=0; i<bj.commands.length;i++) { // loop the commands allowed in config
        if (bj.commands[i] == msg.content.split(' ')[0].split(bj.prefix)[1]) allowcmd = true;
      };
      if (!allowcmd && !bj.special) return; // check if command is allowed (or bot is special - can use all commands)
      msg.delete();
      if (cmd.meonly) {
        if (msg.author.id !== process.env.ME) return;
      }
      try {
        cmd.run(id.split('.json')[0], client, msg, {config: bj}); // run the command
      } catch(err) {
        var data = `${id} : ${id.split('.json')[0]} : ${client.user.username} : ${msg.content} : ./commands/${msg.content.split(prefix)[1].split(' ')[0]}.js`
        msg.channel.send(`Oh no! My lazy coding exposed itself! WyattL#3477 with \`\`\`${err}\`\`\` and \`\`\`${data}\`\`\``);
      }
    }
  });
  client.on('guildCreate', (guild) => {
    var guilds = client.guilds.array();
    if (guilds.length > 1) { 
      guild.owner.user.send(`Hi! I'm currently in ${guilds[0]} and ${guilds[1]}. Sadly, I cannot operate in two servers at once. Please kick me from the other server, first!`);
      guild.leave();
    }
  });
  client.on('guildMemberAdd', (member) => {
    if (config.get(id.split(".json")[0], "autorole")) {
      var role = member.guild.roles.find(r => r.name == config.get(id.split(".json")[0], "autorole"));
      if (role) {
        member.addRole(role);
      }
    }
    if (config.get(id.split(".json")[0], "joinmsg") && config.get(id.split(".json")[0], "joinmsgchannel")) {
      var msg = config.get(id.split(".json")[0], "joinmsg")
      var channel = member.guild.channels.find(ch => ch.name.includes(config.get(id.split(".json")[0], "joinmsgchannel")));
      if (!channel) return false;
      msg = msg.replace(/@user/g, member.toString())
      channel.send(msg);
    }
  })
  client.on('guildMemberRemove', (member) => {
    if (config.get(id.split(".json")[0], "leavemsg") && config.get(id.split(".json")[0], "leavemsgchannel")) {
      var msg = config.get(id.split(".json")[0], "leavemsg")
      var channel = member.guild.channels.find(ch => ch.name.includes(config.get(id.split(".json")[0], "leavemsgchannel")));
      if (!channel) return false;
      msg = msg.replace(/@user/g, member.toString())
      channel.send(msg);
    }
  })
};

fs.readdir(bot_dir, function(err, files) { // Read all files in the bot directory
  if (!files) { // ensure files are in the directory
    console.error('Invalid bot directory. No bots contained within directory.')
  } else {
    var i;
    for (i=0;i<files.length;i++) { // Loop all files in the directory
      createBot(files[i]); // begin making the bot
    };
  };
});