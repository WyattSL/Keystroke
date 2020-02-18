const express = require('express');
const app = express();
const Discord = require('discord.js');

exports.run = function(client, config) {
  // empty function, needed to silence error message
}

exports.chat = function(user, msg, id) {
  var bf = require(`./bots/${id}.json`);
  if (!bf || !id || !user || !msg || !bf.scid || !bf.scto) return false;
  var client = new Discord.WebhookClient(bf.scid, bf.scto);
  client.sendSlackMessage({
  'username': user,
  'attachments': [{
    'pretext': msg,
    'color': '#000',
    'footer': 'Powered by Keystroke',
    'ts': Date.now() / 1000
  }]
})
};