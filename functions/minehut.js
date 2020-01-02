const { Client, RichEmbed } = require('discord.js'); // M:TOP
//const got = require('got'); - some weird err msg
const MinehutAPI = require('../api/minehut.js');
const mh = new MinehutAPI();



exports.run = function(client, config) {
  if (!config.mhid) return;
  return setTimeout(called, 5000, client, config);
};
  
  
  
function called(client, config) {
  return;
  if (!client.guilds.first()) return;
  var category = client.channels.find(ch => ch.type == "category" && ch.name == "Server Details");
  if (!category) { // M:CATEGORYCREATE
    client.guilds.first().createChannel('Server Details', {type: 'category'});
    category = client.channels.find(ch => ch.type == "category" && ch.name == "Server Details");
  }
  var status = category.children.find(ch => ch.name.includes("/"));
  if (!status) { // M:STATUSCREATE
    client.guilds.first().createChannel('ONLINE 0/10', {type: 'voice',parent:category.id});
    var status = client.channels.find(ch => ch.type == "voice" && ch.name.includes("/") && ch.parentId == category.id);
  }
  var startbtn = category.children.find(ch => ch.name == "Start Server");
  if (!startbtn) { // M:STARTCREATE
    client.guilds.first().createChannel('Start Server', {type: 'voice', parent: category.id});
    startbtn = category.children.find(ch => ch.name == "Start Server");
  }
  return setInterval(update, 5000, client, config);
};

function update(client, config) {
  mh.ghostLogin(process.env[`MH_${config.id}`]);
  return;
};